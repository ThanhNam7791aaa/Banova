import React from 'react';

export default function ProductCard({ 
  product, 
  viewMode = 'grid',
  onAddToCart = () => {},
  onViewDetail = () => {}
}) {
  const isList = viewMode === 'list';

  return (
    <article 
      className={`product-item flex bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border border-surface-container/40 ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* Product Image */}
      <div 
        className={`relative bg-surface-container-low overflow-hidden ${
          isList ? 'w-full sm:w-72 h-56 sm:h-auto shrink-0' : 'w-full aspect-[4/3]'
        }`}
      >
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={product.name} 
          src={product.image} 
        />
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-space-sm py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide shadow-xs">
              {product.badge}
            </span>
          )}
          {product.rsBadge && (
            <span className="px-space-sm py-0.5 rounded-full bg-secondary-container/90 text-on-secondary-container font-label-sm text-label-sm font-bold backdrop-blur-sm">
              {product.rsBadge}
            </span>
          )}
        </div>

        {product.discount && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-md bg-error text-on-error font-label-sm text-label-sm font-bold shadow-xs">
              {product.discount}
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
        <div>
          {/* Chỉ hiện đánh giá khi BE thực sự có dữ liệu — không bịa số */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 text-tertiary-fixed-dim text-[13px] pb-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-bold text-on-surface">{product.rating}</span>
              {product.reviewsCount > 0 && (
                <span className="text-outline">({product.reviewsCount} đánh giá)</span>
              )}
            </div>
          )}

          <h2 
            onClick={() => onViewDetail(product)}
            className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h2>

          {isList && (
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-2 line-clamp-2 hidden sm:block">
              {product.description}
            </p>
          )}
        </div>

        <div className="space-y-space-sm pt-space-xs border-t border-surface-container/50">
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-md text-headline-md text-primary font-bold">
              {product.formattedPrice}
            </span>
            {product.originalPrice && (
              <span className="font-body-sm text-body-sm text-outline line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          {product.spec && product.spec.includes('muỗng') && (
            <div className="flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">kitchen</span>
              <span className="font-label-sm text-[11px] text-secondary font-bold">
                {product.spec.replace('Hũ ', '').replace('Combo ', '')}
              </span>
            </div>
          )}

          <div className="flex items-center gap-space-xs">
            <button 
              type="button"
              onClick={() => onAddToCart(product)}
              className="add-to-cart-btn flex-1 h-11 px-space-md rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Thêm vào giỏ</span>
            </button>
            <button 
              type="button"
              aria-label={`Xem chi tiết ${product.name}`} 
              onClick={() => onViewDetail(product)}
              className="w-11 h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
