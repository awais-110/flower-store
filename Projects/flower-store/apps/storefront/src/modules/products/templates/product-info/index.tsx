import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="font-saira text-[10.5px] uppercase tracking-[0.22em] font-medium text-petal-veil hover:text-fresh-bud transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="font-heritage text-3xl sm:text-4xl font-normal leading-snug tracking-[-0.01em] text-charcoal"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="font-saira text-[14px] text-charcoal/70 whitespace-pre-line leading-relaxed font-light"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
