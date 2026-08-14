"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { getChildRoutes } from "@/app/_data/routes";

const AUTOPLAY_DELAY = 7600;
const CARD_WIDTH = 4.1;
const CARD_HEIGHT = 5.35;

const SERVICE_DETAILS: Record<
  string,
  { description: string; texture: string }
> = {
  "/uslugi/remont-kvartir": {
    description:
      "Полный цикл ремонта городской квартиры: инженерия, отделка, комплектация и приемка одной командой.",
    texture: "/services/apartments.jpg",
  },
  "/uslugi/remont-domov": {
    description:
      "Комплексная реализация частного дома с учетом архитектуры, инженерных систем и сценариев жизни.",
    texture: "/services/houses.jpg",
  },
  "/uslugi/dizayn-proekty": {
    description:
      "Планировочные решения, визуализации, рабочие чертежи и спецификации для точной реализации.",
    texture: "/services/design.jpg",
  },
  "/uslugi/remont-kommercheskih-pomescheniy": {
    description:
      "Офисы, салоны, шоурумы и ритейл, подготовленные к запуску в согласованные сроки.",
    texture: "/services/commercial.jpg",
  },
  "/uslugi/landshaftnyy-dizayn": {
    description:
      "Архитектура участка, озеленение, освещение и малые формы в единой природной композиции.",
    texture: "/services/landscape.jpg",
  },
};

const services = getChildRoutes("/uslugi").map((route, index) => {
  const detail = SERVICE_DETAILS[route.href];
  return {
    ...route,
    indexLabel: String(index + 1).padStart(2, "0"),
    shortDescription: detail?.description ?? route.description,
    texture: detail?.texture ?? route.heroImage,
  };
});

type CardMaterial = THREE.ShaderMaterial & {
  uniforms: {
    uTexture: THREE.IUniform<THREE.Texture>;
    uTextureSize: THREE.IUniform<THREE.Vector2>;
    uPlaneSize: THREE.IUniform<THREE.Vector2>;
    uOpacity: THREE.IUniform<number>;
    uBrightness: THREE.IUniform<number>;
  };
};

type SceneApi = {
  camera: THREE.PerspectiveCamera;
  meshes: THREE.Mesh<THREE.PlaneGeometry, CardMaterial>[];
  raycaster: THREE.Raycaster;
};

type DragState = {
  x: number;
  progress: number;
  lastX: number;
  lastTime: number;
  velocity: number;
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uTextureSize;
  uniform vec2 uPlaneSize;
  uniform float uOpacity;
  uniform float uBrightness;
  varying vec2 vUv;

  void main() {
    float textureAspect = uTextureSize.x / uTextureSize.y;
    float planeAspect = uPlaneSize.x / uPlaneSize.y;
    vec2 scale = vec2(1.0);

    if (textureAspect > planeAspect) {
      scale.x = planeAspect / textureAspect;
    } else {
      scale.y = textureAspect / planeAspect;
    }

    vec2 coverUv = (vUv - 0.5) * scale + 0.5;
    vec4 color = texture2D(uTexture, coverUv);
    gl_FragColor = vec4(color.rgb * uBrightness, color.a * uOpacity);
  }
`;

function wrapIndex(index: number) {
  return ((index % services.length) + services.length) % services.length;
}

function wrappedDistance(index: number, progress: number) {
  let distance = index - progress;
  const half = services.length / 2;
  while (distance > half) distance -= services.length;
  while (distance < -half) distance += services.length;
  return distance;
}

export function ServicesCarousel3D() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneApiRef = useRef<SceneApi | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rotationVelocityRef = useRef(0);
  const dragStartRef = useRef<DragState | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const activeService = services[activeIndex];
  const isPaused = isUserPaused || isInteracting;

  const setProgress = useCallback((nextProgress: number) => {
    targetProgressRef.current = nextProgress;
    setActiveIndex(wrapIndex(Math.round(nextProgress)));
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => {
      setProgress(Math.round(targetProgressRef.current) + direction);
    },
    [setProgress],
  );

  const selectService = useCallback(
    (index: number) => {
      const current = targetProgressRef.current;
      const cycle = Math.round((current - index) / services.length);
      const candidates = [
        index + cycle * services.length,
        index + (cycle - 1) * services.length,
        index + (cycle + 1) * services.length,
      ];
      const closest = candidates.reduce((best, candidate) =>
        Math.abs(candidate - current) < Math.abs(best - current) ? candidate : best,
      );
      setProgress(closest);
    },
    [setProgress],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      reducedMotionRef.current = media.matches;
    };
    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);
    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotionRef.current) return;
    const timer = window.setTimeout(() => move(1), AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, move]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      queueMicrotask(() => setHasWebGlError(true));
      return;
    }

    renderer.setClearColor(0x0d0d0c, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d0c);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 11.2);

    const cardGeometry = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT, 1, 1);
    const frameGeometry = new THREE.PlaneGeometry(
      CARD_WIDTH + 0.08,
      CARD_HEIGHT + 0.08,
      1,
      1,
    );
    const textureLoader = new THREE.TextureLoader();
    const groups: THREE.Group[] = [];
    const meshes: THREE.Mesh<THREE.PlaneGeometry, CardMaterial>[] = [];
    const frameMaterials: THREE.MeshBasicMaterial[] = [];
    const textures: THREE.Texture[] = [];

    const texturePromises = services.map(
      (service) =>
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(service.texture, resolve, undefined, reject);
        }),
    );

    let disposed = false;
    let animationFrame = 0;
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();

    Promise.all(texturePromises)
      .then((loadedTextures) => {
        if (disposed) {
          loadedTextures.forEach((texture) => texture.dispose());
          return;
        }

        loadedTextures.forEach((texture, index) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
          textures.push(texture);

          const image = texture.image as HTMLImageElement;
          const material = new THREE.ShaderMaterial({
            uniforms: {
              uTexture: { value: texture },
              uTextureSize: {
                value: new THREE.Vector2(image.naturalWidth, image.naturalHeight),
              },
              uPlaneSize: { value: new THREE.Vector2(CARD_WIDTH, CARD_HEIGHT) },
              uOpacity: { value: 1 },
              uBrightness: { value: 1 },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: true,
            side: THREE.DoubleSide,
          }) as CardMaterial;

          const frameMaterial = new THREE.MeshBasicMaterial({
            color: 0xd4b98f,
            transparent: true,
            opacity: index === 0 ? 0.9 : 0.2,
            side: THREE.DoubleSide,
          });
          frameMaterials.push(frameMaterial);

          const group = new THREE.Group();
          const frame = new THREE.Mesh(frameGeometry, frameMaterial);
          frame.position.z = -0.035;
          const mesh = new THREE.Mesh(cardGeometry, material);
          mesh.userData.serviceIndex = index;
          group.add(frame, mesh);
          scene.add(group);
          groups.push(group);
          meshes.push(mesh);
        });

        sceneApiRef.current = { camera, meshes, raycaster };
        setIsReady(true);

        const renderFrame = () => {
          const delta = Math.min(clock.getDelta(), 0.05);
          const elapsed = clock.elapsedTime;
          const displacement =
            targetProgressRef.current - currentProgressRef.current;
          const spring = dragStartRef.current ? 58 : 42;
          const friction = dragStartRef.current ? 13.5 : 10.5;

          rotationVelocityRef.current += displacement * spring * delta;
          rotationVelocityRef.current *= Math.exp(-friction * delta);
          currentProgressRef.current += rotationVelocityRef.current * delta;

          if (
            !dragStartRef.current &&
            Math.abs(displacement) < 0.0005 &&
            Math.abs(rotationVelocityRef.current) < 0.0005
          ) {
            currentProgressRef.current = targetProgressRef.current;
            rotationVelocityRef.current = 0;
          }

          canvas.dataset.progress = currentProgressRef.current.toFixed(4);
          canvas.dataset.targetProgress = targetProgressRef.current.toFixed(4);
          canvas.dataset.rotationVelocity = rotationVelocityRef.current.toFixed(4);

          const width = canvas.clientWidth;
          const isMobile = width < 720;
          const radius = isMobile ? 5.05 : 6.25;
          const angleStep = isMobile ? 0.69 : 0.64;

          groups.forEach((group, index) => {
            const distance = wrappedDistance(index, currentProgressRef.current);
            const angle = distance * angleStep;
            const absoluteDistance = Math.abs(distance);
            const activeStrength = Math.max(0, 1 - absoluteDistance);

            group.position.x = Math.sin(angle) * radius;
            group.position.z = (Math.cos(angle) - 1) * radius * 0.72;
            group.position.y =
              (reducedMotionRef.current ? 0 : Math.sin(elapsed * 0.72 + index) * 0.035) +
              absoluteDistance * 0.08;
            group.rotation.y = -angle * 0.72;
            const scale = 1 - Math.min(absoluteDistance * 0.115, 0.27);
            group.scale.setScalar(scale);

            const material = meshes[index].material;
            material.uniforms.uOpacity.value = THREE.MathUtils.clamp(
              1 - absoluteDistance * 0.22,
              0.26,
              1,
            );
            material.uniforms.uBrightness.value = 0.52 + activeStrength * 0.48;
            frameMaterials[index].opacity = 0.16 + activeStrength * 0.7;
          });

          const parallax = reducedMotionRef.current ? 0 : 1;
          camera.position.x +=
            (pointerRef.current.x * 0.22 * parallax - camera.position.x) * 0.045;
          camera.position.y +=
            (-pointerRef.current.y * 0.12 * parallax - camera.position.y) * 0.045;
          camera.position.z = isMobile ? 12.3 : 11.2;
          camera.lookAt(0, 0, -0.5);

          renderer.render(scene, camera);
          animationFrame = window.requestAnimationFrame(renderFrame);
        };

        renderFrame();
      })
      .catch(() => {
        if (!disposed) setHasWebGlError(true);
      });

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
      sceneApiRef.current = null;
      cardGeometry.dispose();
      frameGeometry.dispose();
      meshes.forEach((mesh) => mesh.material.dispose());
      frameMaterials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    dragStartRef.current = {
      x: event.clientX,
      progress: targetProgressRef.current,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
    };
    didDragRef.current = false;
    setIsInteracting(true);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointerRef.current.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    if (!dragStartRef.current) return;
    const elapsed = Math.max(event.timeStamp - dragStartRef.current.lastTime, 1);
    const instantaneousVelocity =
      (event.clientX - dragStartRef.current.lastX) / elapsed;
    dragStartRef.current.velocity =
      dragStartRef.current.velocity * 0.68 + instantaneousVelocity * 0.32;
    dragStartRef.current.lastX = event.clientX;
    dragStartRef.current.lastTime = event.timeStamp;
    const distance = event.clientX - dragStartRef.current.x;
    if (Math.abs(distance) > 5) didDragRef.current = true;
    targetProgressRef.current =
      dragStartRef.current.progress - distance / Math.min(bounds.width * 0.24, 250);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const dragStart = dragStartRef.current;
    dragStartRef.current = null;
    setIsInteracting(false);
    setIsDragging(false);

    if (dragStart && didDragRef.current) {
      const projectedProgress =
        targetProgressRef.current - dragStart.velocity * 0.34;
      setProgress(Math.round(projectedProgress));
      return;
    }

    const api = sceneApiRef.current;
    if (!api) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    api.raycaster.setFromCamera(pointer, api.camera);
    const hit = api.raycaster.intersectObjects(api.meshes, false)[0];
    if (!hit) return;

    const index = Number(hit.object.userData.serviceIndex);
    if (index === activeIndex) {
      router.push(services[index].href);
    } else {
      selectService(index);
    }
  };

  return (
    <section
      id="service-directions"
      aria-labelledby="services-carousel-heading"
      className="bg-[#0d0d0c] text-white py-20 md:py-28 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-margin-mobile lg:px-margin-desktop mb-10 md:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-end">
          <div className="lg:col-span-7">
            <span className="font-label-caps text-label-caps text-[#c5a880] block mb-5">
              Интерактивная карта услуг
            </span>
            <h2
              id="services-carousel-heading"
              className="font-display-lg-mobile md:font-display-lg md:text-display-lg leading-tight"
            >
              Пять направлений в едином пространстве
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 font-body-md text-body-md text-white/60 leading-relaxed max-w-lg">
            Каждое направление объединяет проектирование, реализацию и
            комплектацию под ответственностью одной команды.
          </p>
        </div>
      </div>

      <div
        className="service-webgl-stage relative h-[670px] md:h-[735px]"
        data-ready={isReady}
        data-dragging={isDragging}
        role="region"
        aria-roledescription="3D-карусель"
        aria-label="Направления услуг"
        tabIndex={0}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => {
          setIsInteracting(false);
          pointerRef.current = { x: 0, y: 0 };
        }}
        onFocus={() => setIsInteracting(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsInteracting(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            selectService(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            selectService(services.length - 1);
          }
        }}
      >
        <Image
          src={activeService.texture}
          alt=""
          fill
          sizes="100vw"
          className={`service-webgl-fallback object-cover ${
            isReady && !hasWebGlError ? "opacity-0" : "opacity-35"
          }`}
        />

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full touch-pan-y ${
            hasWebGlError ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStartRef.current = null;
            setIsInteracting(false);
            setIsDragging(false);
            setProgress(Math.round(targetProgressRef.current));
          }}
        />

        <div className="service-webgl-shade absolute inset-0 pointer-events-none" />

        {!isReady && !hasWebGlError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <span className="font-label-caps text-[9px] text-white/55">
              Подготавливаем 3D-пространство
            </span>
          </div>
        )}

        <div className="absolute z-20 inset-x-0 top-0 px-margin-mobile lg:px-margin-desktop pt-7 md:pt-9 flex items-center justify-between pointer-events-none">
          <span className="font-label-caps text-[9px] text-white/55">
            Перетащите, чтобы повернуть
          </span>
          <span className="font-serif text-lg italic text-white/75" aria-live="polite">
            {activeService.indexLabel} / {String(services.length).padStart(2, "0")}
          </span>
        </div>

        <div
          key={activeService.href}
          className="service-webgl-copy absolute z-20 left-0 bottom-0 w-full md:w-[62%] px-margin-mobile lg:pl-margin-desktop lg:pr-16 pb-9 md:pb-14 pointer-events-none"
        >
          <p className="service-webgl-copy-item font-label-caps text-[9px] text-[#d9bd94] mb-4">
            {activeService.eyebrow}
          </p>
          <h3 className="service-webgl-copy-item font-headline-md text-[36px] sm:text-[46px] md:text-[58px] leading-[1.02] mb-5">
            {activeService.label}
          </h3>
          <p className="service-webgl-copy-item hidden sm:block font-body-md text-body-md text-white/70 leading-relaxed max-w-xl mb-7">
            {activeService.shortDescription}
          </p>
          <Link
            href={activeService.href}
            className="service-webgl-copy-item pointer-events-auto group inline-flex w-fit whitespace-nowrap items-center gap-4 bg-white text-black px-5 md:px-6 py-4 font-label-caps text-[9px] hover:bg-[#c5a880] transition-colors duration-500"
          >
            Подробнее об услуге
            <span className="material-symbols-outlined text-[18px] transition-transform duration-500 group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="absolute z-30 right-margin-mobile lg:right-margin-desktop top-32 md:top-auto md:bottom-14 flex items-center gap-2">
          <button
            type="button"
            title={isUserPaused ? "Возобновить вращение" : "Приостановить вращение"}
            aria-label={isUserPaused ? "Возобновить вращение" : "Приостановить вращение"}
            aria-pressed={isUserPaused}
            onClick={() => setIsUserPaused((paused) => !paused)}
            className="service-webgl-control"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isUserPaused ? "play_arrow" : "pause"}
            </span>
          </button>
          <button
            type="button"
            title="Предыдущая услуга"
            aria-label="Предыдущая услуга"
            onClick={() => move(-1)}
            className="service-webgl-control"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <button
            type="button"
            title="Следующая услуга"
            aria-label="Следующая услуга"
            onClick={() => move(1)}
            className="service-webgl-control"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="absolute z-20 inset-x-0 bottom-0 h-[2px] bg-white/10 pointer-events-none">
          {!isPaused && (
            <span
              key={`progress-${activeService.href}`}
              className="service-webgl-progress block h-full bg-[#d9bd94]"
            />
          )}
        </div>
      </div>

      <nav
        aria-label="Выбор направления услуг"
        className="service-webgl-nav flex overflow-x-auto scrollbar-hide border-b border-white/12"
      >
        {services.map((service, index) => (
          <button
            key={service.href}
            type="button"
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => selectService(index)}
            className="service-webgl-nav-item min-w-[180px] md:min-w-0 md:flex-1 px-5 md:px-7 py-5 md:py-6 text-left border-r border-white/12"
          >
            <span className="font-serif text-xs italic text-white/35 block mb-2">
              {service.indexLabel}
            </span>
            <span className="font-label-caps text-[9px] leading-relaxed text-white/55">
              {service.label}
            </span>
          </button>
        ))}
      </nav>
    </section>
  );
}
