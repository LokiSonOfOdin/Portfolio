import avatar from "../assets/avatar.webp";

interface PhotoProps {
  /** Класс для позиционирования и размеров из родительского блока. */
  className?: string;
  /** Альтернативный текст; по умолчанию — имя владельца сайта. */
  alt?: string;
  /** `true` для фото первого экрана: грузим сразу и с высоким приоритетом. */
  eager?: boolean;
}

/**
 * Фотография владельца сайта с прозрачным фоном.
 * Один файл используется на главной и на странице контактов.
 */
export default function Photo({
  className = "",
  alt = "Ганиев Рустем",
  eager = false,
}: PhotoProps) {
  return (
    <img
      className={className}
      src={avatar}
      alt={alt}
      width={900}
      height={1015}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
}
