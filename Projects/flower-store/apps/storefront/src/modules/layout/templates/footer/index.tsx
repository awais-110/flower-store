import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="border-t border-sage/20 w-full bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-16">
          <div className="max-w-xs">
            <LocalizedClientLink
              href="/"
              className="font-heritage text-[26px] tracking-[-0.01em] text-charcoal leading-none hover:text-petal-veil transition-colors"
            >
              Camelia
            </LocalizedClientLink>
            <p className="font-saira text-[10px] uppercase tracking-[0.3em] text-petal-veil font-medium mt-2">
              Haute Botanical Atelier · Pakistan
            </p>
            <p className="font-saira text-[13px] text-charcoal/60 mt-4 leading-relaxed font-light">
              Bespoke bouquets, rare seasonal stems, and white-glove floral
              delivery across Karachi, Lahore, and Islamabad.
            </p>
          </div>
          <div className="text-xs gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 font-saira">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-saira text-[10.5px] uppercase tracking-[0.22em] text-charcoal font-semibold">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-charcoal/60"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-petal-veil transition-colors",
                            children && "text-charcoal/80 font-medium"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-petal-veil transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-saira text-[10.5px] uppercase tracking-[0.22em] text-charcoal font-semibold">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-charcoal/60", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-petal-veil transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="font-saira text-[10.5px] uppercase tracking-[0.22em] text-charcoal font-semibold">
                Atelier
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-charcoal/60">
                <li>
                  <LocalizedClientLink
                    className="hover:text-petal-veil transition-colors"
                    href="/custom-bouquet"
                  >
                    Bespoke Compositions
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-petal-veil transition-colors"
                    href="/store"
                  >
                    The Full Boutique
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-petal-veil transition-colors"
                    href="/#delivery"
                  >
                    Delivery &amp; Care
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-petal-veil transition-colors"
                    href="/account"
                  >
                    Account
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-10 justify-between items-center text-charcoal/50 border-t border-sage/15 pt-6">
          <Text className="font-saira text-[11px]">
            © {new Date().getFullYear()} Camelia. All rights reserved.
          </Text>
          <Text className="font-saira text-[11px] uppercase tracking-[0.2em]">
            Hand-arranged with care
          </Text>
        </div>
      </div>
    </footer>
  );
}
