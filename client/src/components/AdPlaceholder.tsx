interface AdPlaceholderProps {
  size?: 'banner' | 'medium' | 'large';
  label?: string;
}

export default function AdPlaceholder({ size = 'banner', label = 'Advertisement' }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: 'h-24 md:h-20',
    medium: 'h-64 md:h-96',
    large: 'h-96 md:h-[500px]',
  };

  return (
    <div className={`ad-placeholder ${sizeClasses[size]}`}>
      {/* AdSense Ad Slot */}
      <div className="text-center">
        <p className="font-semibold text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Google AdSense</p>
      </div>
    </div>
  );
}
