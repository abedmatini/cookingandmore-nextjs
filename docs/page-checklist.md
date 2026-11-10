# Page-by-page migration checklist

The “Saved HTML” column records the source file used for the route. “Exact” means the normalized main-content text has the same character count before and after import. Image counts compare original `<img>` elements with imported elements; every image-loading attribute points to `public/media/imported/`. Links were preserved, with internal absolute URLs normalized to local paths.

| Original URL | New route | Saved HTML | Main text | Images | Links |
|---|---|---|---|---|---|
| `https://cookingandmore.de/category/uncategorized/` | `/category/uncategorized/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/cooking/` | `/category/cooking/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/modern-fusion/` | `/category/modern-fusion/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/streetfood/` | `/category/streetfood/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/foodtrucks/` | `/category/foodtrucks/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/weihnachtsfeier/` | `/category/weihnachtsfeier/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/sommerfest/` | `/category/sommerfest/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/gala/` | `/category/gala/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/messe-crewcatering/` | `/category/messe-crewcatering/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/hochzeit/` | `/category/hochzeit/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/jubilaum/` | `/category/jubilaum/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/doc2/` | `/category/doc2/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/e-werk/` | `/category/e-werk/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/e-palladium/` | `/category/e-palladium/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/zur-gemutlichen-ekce/` | `/category/zur-gemutlichen-ekce/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/goldener-pflug/` | `/category/goldener-pflug/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/category/alte-giesserei/` | `/category/alte-giesserei/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/galleries/home-4-gallery/` | `/galleries/home-4-gallery/` | `galleries__home-4-gallery.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/menus/baked-potato-pizza/` | `/menus/baked-potato-pizza/` | `menus__baked-potato-pizza.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/imported-salmon-steak/` | `/menus/imported-salmon-steak/` | `menus__imported-salmon-steak.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/crab-with-curry-sources/` | `/menus/crab-with-curry-sources/` | `menus__crab-with-curry-sources.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/salted-fried-chicken/` | `/menus/salted-fried-chicken/` | `menus__salted-fried-chicken.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/roast-pork-4-sticks/` | `/menus/roast-pork-4-sticks/` | `menus__roast-pork-4-sticks.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/tuna-roast-potatoes-source/` | `/menus/tuna-roast-potatoes-source/` | `menus__tuna-roast-potatoes-source.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/fried-potatoes-with-garlic/` | `/menus/fried-potatoes-with-garlic/` | `menus__fried-potatoes-with-garlic.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/italian-source-mushroom/` | `/menus/italian-source-mushroom/` | `menus__italian-source-mushroom.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/fried-chicken-salad/` | `/menus/fried-chicken-salad/` | `menus__fried-chicken-salad.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/grilled-salmon-sushi/` | `/menus/grilled-salmon-sushi/` | `menus__grilled-salmon-sushi.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/fresh-crab-with-lemon-source/` | `/menus/fresh-crab-with-lemon-source/` | `menus__fresh-crab-with-lemon-source.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/spicy-crab-ramen/` | `/menus/spicy-crab-ramen/` | `menus__spicy-crab-ramen.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/pork-with-italian-salsa-verde/` | `/menus/pork-with-italian-salsa-verde/` | `menus__pork-with-italian-salsa-verde.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/lamb-beef-kofka-skewers-with-tzatziki/` | `/menus/lamb-beef-kofka-skewers-with-tzatziki/` | `menus__lamb-beef-kofka-skewers-with-tzatziki.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/bacon-wrapped-shrimp-with-smoked-paprika-garlic/` | `/menus/bacon-wrapped-shrimp-with-smoked-paprika-garlic/` | `menus__bacon-wrapped-shrimp-with-smoked-paprika-garlic.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/lemon-and-garlic-green-beans/` | `/menus/lemon-and-garlic-green-beans/` | `menus__lemon-and-garlic-green-beans.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/roasted-red-potatoes-with-rosemary-shallots-butter/` | `/menus/roasted-red-potatoes-with-rosemary-shallots-butter/` | `menus__roasted-red-potatoes-with-rosemary-shallots-butter.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/black-bean-sweet-potato-quinoa-meatlessloaf/` | `/menus/black-bean-sweet-potato-quinoa-meatlessloaf/` | `menus__black-bean-sweet-potato-quinoa-meatlessloaf.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/wild-mushroom-bucatini-with-kale/` | `/menus/wild-mushroom-bucatini-with-kale/` | `menus__wild-mushroom-bucatini-with-kale.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/prawn-sausage-cassoulet/` | `/menus/prawn-sausage-cassoulet/` | `menus__prawn-sausage-cassoulet.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/meatloaf-with-black-pepper-honey-bbq-sauce/` | `/menus/meatloaf-with-black-pepper-honey-bbq-sauce/` | `menus__meatloaf-with-black-pepper-honey-bbq-sauce.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/grilled-hanger-steak-with-harissa-and-pickled-red-onions/` | `/menus/grilled-hanger-steak-with-harissa-and-pickled-red-onions/` | `menus__grilled-hanger-steak-with-harissa-and-pickled-red-onions.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/braised-chicken-breast-with-white-wine-and-shallots/` | `/menus/braised-chicken-breast-with-white-wine-and-shallots/` | `menus__braised-chicken-breast-with-white-wine-and-shallots.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/apple-smoked-chicken-with-white-bbq-sauce/` | `/menus/apple-smoked-chicken-with-white-bbq-sauce/` | `menus__apple-smoked-chicken-with-white-bbq-sauce.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/lemon-rosemary-chicken/` | `/menus/lemon-rosemary-chicken/` | `menus__lemon-rosemary-chicken.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/grilled-pork-shoulder-with-preserved-lemons/` | `/menus/grilled-pork-shoulder-with-preserved-lemons/` | `menus__grilled-pork-shoulder-with-preserved-lemons.html` | ✓ Exact | ✓ 6/6 local | ✓ |
| `https://cookingandmore.de/menus/pork-tenderloin-marinated-in-yogurt/` | `/menus/pork-tenderloin-marinated-in-yogurt/` | `menus__pork-tenderloin-marinated-in-yogurt.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/menus/oysters-grill-5-pieces/` | `/menus/oysters-grill-5-pieces/` | `menus__oysters-grill-5-pieces.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/` | `/` | `home.html` | ✓ Exact | ✓ 68/68 local | ✓ |
| `https://cookingandmore.de/kontakt/` | `/kontakt/` | `kontakt.html` | ✓ Exact | ✓ 1/1 local | ✓ |
| `https://cookingandmore.de/datenschutzerklarung/` | `/datenschutzerklarung/` | `datenschutzerklarung.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/impressum/` | `/impressum/` | `impressum.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/about-us-2/` | `/about-us-2/` | `about-us-2.html` | ✓ Exact | ✓ 9/9 local | ✓ |
| `https://cookingandmore.de/business/` | `/business/` | `business.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/about-us/` | `/about-us/` | `about-us.html` | ✓ Exact | ✓ 9/9 local | ✓ |
| `https://cookingandmore.de/locations/` | `/locations/` | `locations.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/privat/` | `/privat/` | `privat.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/te/` | `/te/` | `te.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/our-services/` | `/our-services/` | `our-services.html` | ✓ Exact | ✓ 25/25 local | ✓ |
| `https://cookingandmore.de/menu-parallax/` | `/menu-parallax/` | `menu-parallax.html` | ✓ Exact | ✓ 8/8 local | ✓ |
| `https://cookingandmore.de/menu-grid/` | `/menu-grid/` | `menu-grid.html` | ✓ Exact | ✓ 8/8 local | ✓ |
| `https://cookingandmore.de/shop/` | `/shop/` | `shop.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/sample-page/` | `/sample-page/` | `sample-page.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/our-chefs/` | `/our-chefs/` | `our-chefs.html` | ✓ Exact | ✓ 4/4 local | ✓ |
| `https://cookingandmore.de/menu-grid-image/` | `/menu-grid-image/` | `menu-grid-image.html` | ✓ Exact | ✓ 8/8 local | ✓ |
| `https://cookingandmore.de/menu-classic/` | `/menu-classic/` | `menu-classic.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/menu-mixed/` | `/menu-mixed/` | `menu-mixed.html` | ✓ Exact | ✓ 8/8 local | ✓ |
| `https://cookingandmore.de/shop-2/` | `/shop-2/` | `shop-2.html` | ✓ Exact | ✓ 0/0 local | ✓ |
| `https://cookingandmore.de/doc2/` | `/doc2/` | `doc2.html` | ✓ Exact | ✓ 9/9 local | ✓ |
| `https://cookingandmore.de/lokschuppen/` | `/lokschuppen/` | `lokschuppen.html` | ✓ Exact | ✓ 8/8 local | ✓ |
| `https://cookingandmore.de/goldenerpflug/` | `/goldenerpflug/` | `goldenerpflug.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/alte-giesserei/` | `/alte-giesserei/` | `alte-giesserei.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/hochzeitscaterig/` | `/hochzeitscaterig/` | `hochzeitscaterig.html` | ✓ Exact | ✓ 12/12 local | ✓ |
| `https://cookingandmore.de/hafen12/` | `/hafen12/` | `hafen12.html` | ✓ Exact | ✓ 7/7 local | ✓ |
| `https://cookingandmore.de/zur-gemutlichen-ekce-2/` | `/zur-gemutlichen-ekce-2/` | `zur-gemutlichen-ekce-2.html` | ✓ Exact | ✓ 10/10 local | ✓ |
| `https://cookingandmore.de/feiern-sie-ihre-weihnachtsfeier-mit-dem-business-catering-von-cooking-and-more/` | `/feiern-sie-ihre-weihnachtsfeier-mit-dem-business-catering-von-cooking-and-more/` | `feiern-sie-ihre-weihnachtsfeier-mit-dem-business-catering-von-cooking-and-more.html` | ✓ Exact | ✓ 9/9 local | ✓ |
| `https://cookingandmore.de/perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more/` | `/perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more/` | `perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more.html` | ✓ Exact | ✓ 13/13 local | ✓ |
| `https://cookingandmore.de/verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more/` | `/verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more/` | `verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more.html` | ✓ Exact | ✓ 11/11 local | ✓ |
| `https://cookingandmore.de/entdecken-sie-business-catering-streetfood/` | `/entdecken-sie-business-catering-streetfood/` | `entdecken-sie-business-catering-streetfood.html` | ✓ Exact | ✓ 37/37 local | ✓ |
| `https://cookingandmore.de/e-palladium/` | `/e-palladium/` | `e-palladium.html` | ✓ Exact | ✓ 7/7 local | ✓ |
| `https://cookingandmore.de/e-werk/` | `/e-werk/` | `e-werk.html` | ✓ Exact | ✓ 8/8 local | ✓ |
| `https://cookingandmore.de/junilaumscatering/` | `/junilaumscatering/` | `junilaumscatering.html` | ✓ Exact | ✓ 7/7 local | ✓ |
| `https://cookingandmore.de/streetfooentdecken-sie-business-catering-streetfood/` | `/streetfooentdecken-sie-business-catering-streetfood/` | `streetfooentdecken-sie-business-catering-streetfood.html` | ✓ Exact | ✓ 10/10 local | ✓ |
| `https://cookingandmore.de/feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more/` | `/feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more/` | `feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more.html` | ✓ Exact | ✓ 12/12 local | ✓ |
| `https://cookingandmore.de/secret-of-making-smoked-pork/` | `/secret-of-making-smoked-pork/` | `secret-of-making-smoked-pork.html` | ✓ Exact | ✓ 7/7 local | ✓ |
| `https://cookingandmore.de/recipe-is-important-part-of-cooking/` | `/recipe-is-important-part-of-cooking/` | `recipe-is-important-part-of-cooking.html` | ✓ Exact | ✓ 9/9 local | ✓ |
| `https://cookingandmore.de/tag/cooking/` | `/tag/cooking/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/tag/cuisine/` | `/tag/cuisine/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/tag/dinning/` | `/tag/dinning/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/tag/recipe/` | `/tag/recipe/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/tag/restaurant/` | `/tag/restaurant/` | Not present in archive | Inventory archive verified | N/A | ✓ |
| `https://cookingandmore.de/pricing/extra-corporate/` | `/pricing/extra-corporate/` | `pricing__extra-corporate.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/pricing/corporate/` | `/pricing/corporate/` | `pricing__corporate.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/pricing/business/` | `/pricing/business/` | `pricing__business.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/pricing/standard/` | `/pricing/standard/` | `pricing__standard.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/team/mark-bennett/` | `/team/mark-bennett/` | `team__mark-bennett.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/team/oliver-doe/` | `/team/oliver-doe/` | `team__oliver-doe.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/team/christina-hardy/` | `/team/christina-hardy/` | `team__christina-hardy.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/testimonials/jessica-lee/` | `/testimonials/jessica-lee/` | `testimonials__jessica-lee.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/testimonials/jane-bennett/` | `/testimonials/jane-bennett/` | `testimonials__jane-bennett.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/testimonials/christina-hardy/` | `/testimonials/christina-hardy/` | `testimonials__christina-hardy.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/testimonials/mark-anthony/` | `/testimonials/mark-anthony/` | `testimonials__mark-anthony.html` | ✓ Exact | ✓ 5/5 local | ✓ |
| `https://cookingandmore.de/zur-gemutlichen-ekce/` | `/zur-gemutlichen-ekce/` | Not present in archive | Inventory archive verified | N/A | ✓ |

## Archive-only routes

The supplied archive contains no rendered HTML files for category or tag archives. Those 22 routes were checked against the sitemap inventory and remain statically generated from the imported post inventory.
