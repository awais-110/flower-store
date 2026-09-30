import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col font-saira">
      <span
        className={clx("text-2xl font-semibold text-charcoal", {
          "text-petal-veil": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && <span className="text-base font-normal text-charcoal/60 mr-1">From</span>}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p className="font-saira text-[13px] text-charcoal/60 mt-0.5">
            <span>Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="font-saira text-[12px] text-petal-veil font-semibold">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
