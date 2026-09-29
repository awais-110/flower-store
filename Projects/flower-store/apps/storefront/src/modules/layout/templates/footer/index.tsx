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
              className="font-editorial text-[22px] tracking-[0.15em] text-deep-sage uppercase leading-none hover:text-sage transition-colors"
            >
              Atelier Fleur
            </LocalizedClientLink>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-medium mt-2">
              Luxury Floral · Pakistan
            </p>
            <p className="text-xs text-charcoal-muted mt-4 leading-relaxed font-sans">
              Bespoke bouquets, rare seasonal stems, and white-glove floral
              delivery across Karachi, Lahore, and Islamabad.
            </p>
          </div>
          <div className="text-xs gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 font-sans">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal font-semibold">
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
                        className="flex flex-col gap-2 text-charcoal-muted"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-deep-sage transition-colors",
                            children && "text-charcoal"
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
                                    className="hover:text-deep-sage transition-colors"
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
                <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal font-semibold">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-charcoal-muted", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-deep-sage transition-colors"
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
              <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal font-semibold">
                Atelier
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-charcoal-muted">
                <li>
                  <LocalizedClientLink
                    className="hover:text-deep-sage transition-colors"
                    href="/custom-bouquet"
                  >
                    Bespoke Compositions
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-deep-sage transition-colors"
                    href="/store"
                  >
                    The Full Boutique
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-deep-sage transition-colors"
                    href="/#delivery"
                  >
                    Delivery &amp; Care
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-deep-sage transition-colors"
                    href="/account"
                  >
                    Account
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-10 justify-between items-center text-charcoal-muted border-t border-sage/15 pt-6">
          <Text className="text-[11px]">
            © {new Date().getFullYear()} Atelier Fleur. All rights reserved.
          </Text>
          <Text className="text-[11px] uppercase tracking-[0.2em]">
            Hand-arranged with care
          </Text>
        </div>
      </div>
    </footer>
  );
}
