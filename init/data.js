const sampleListings = [
    {
      name: "Hyaluronic Acid 2% + B5",
      brand: "The Ordinary",
      description: "A hydrating formula with ultra-pure, vegan hyaluronic acid for multi-depth hydration.",
      price: 540,
      image: {
        filename: "hyaluronic-acid-2-b5",
        url : "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494474655/dNGnW442Gs-000000000494474655_1.png"
      },
      category: "Serum",
      skinType: ["Normal", "Oily", "Combination", "Dry", "Sensitive"],
      skinConcern: ["Dryness"],
      keyIngredients: "Hyaluronic Acid, Vitamin B5",
      productFormat: "Serum",
      volume: 30,
      whatMakesItPotent: "Formulated with 2% ultra-pure Hyaluronic Acid that penetrates multiple layers of the skin for long-lasting hydration. Enriched with pro-vitamin B5 to support natural moisture retention. Its lightweight, water-based formula delivers a plumping effect without heaviness. Vegan, cruelty-free, and suitable for all skin types—even the most sensitive. A hydration essential for smoother, more supple skin."
    },
    {
      name: "Watermelon Glow PHA+BHA Pore-Tight Toner",
      brand: "Glow Recipe",
      description: "A gentle, exfoliating toner that hydrates and minimizes the appearance of pores.",
      price: 680,
      image: {
        filename: "watermelon-glow-toner",
      url : "https://s9ldqad3n3.eu.scalesta-cdn.com/NQP3-Md9QsGKRDpL09cZ4xPKzLY=/fit-in/465x465/filters:format(webp):fill(fff)/www.styledotty.com/images/detailed/12/Screenshot_2021-08-08_at_19.31.41.png",
      },
      category: "Toner",
      skinType: ["Normal", "Oily", "Combination"],
      skinConcern: ["Dullness"],
      keyIngredients: "PHA, BHA, Watermelon Extract, Hyaluronic Acid",
      productFormat: "Lotion",
      volume: 150,
      whatMakesItPotent: "This toner combines the gentle chemical exfoliation of BHA and PHA to clarify pores and smooth texture. Infused with watermelon extract, it delivers antioxidants that brighten and calm stressed skin. Hyaluronic Acid boosts hydration for a bouncy, dewy finish. Alcohol-free and non-stripping, it's perfect for daily use. Experience smoother, clarified skin without dryness or irritation."
    },
    {
      name: "Hydrating Facial Cleanser",
      brand: "CeraVe",
      description: "A gentle, non-foaming cleansing lotion with ceramides and hyaluronic acid that cleanses and hydrates.",
      price: 759,
      image: {
        filename: "cerave-hydrating-cleanser",
      url:
      "https://m.media-amazon.com/images/I/51p9kUSoX2L.jpg",
    },
      category: "Cleanser",
      skinType: ["Normal", "Dry", "Sensitive"],
      skinConcern: ["Dryness"],
      keyIngredients: "Ceramides, Hyaluronic Acid",
      productFormat: "Lotion",
      volume: 355,
      whatMakesItPotent: "Developed with dermatologists, this non-foaming formula gently removes makeup and impurities without disrupting the skin barrier. Ceramides restore and protect the natural moisture barrier, while hyaluronic acid locks in hydration. Fragrance-free and non-comedogenic, ideal for sensitive skin. Leaves skin feeling clean, soft, and supple after every wash. A daily essential for dry or compromised skin types."
    },
    {
      name: "Lala Retro Whipped Cream",
      brand: "Drunk Elephant",
      description: "A rescue cream infused with six African oils and a ceramide complex for intense moisture.",
      price: 3499,
      image: {
        filename: "lala-retro-whipped-cream",
       url : "https://m.media-amazon.com/images/I/51xl3zcOsiL.jpg"
       },
      category: "Moisturizer",
      skinType: ["Normal", "Dry"],
      skinConcern: ["Dryness", "Fine Lines & Wrinkles"],
      keyIngredients: "Ceramides, Marula Oil",
      productFormat: "Cream",
      volume: 50,
      whatMakesItPotent: "Packed with a blend of six rare African oils, this whipped cream deeply nourishes and repairs dry, dehydrated skin. Ceramides strengthen the skin barrier, improving elasticity and moisture retention. Rich, buttery texture melts into skin to soothe tightness and irritation. Antioxidants fight visible signs of aging while promoting glow. Ideal for dry or mature skin needing an intense hydration boost."
    },
    {
      name: "Anthelios Melt-in Milk Sunscreen SPF 60",
      brand: "La Roche-Posay",
      description: "A broad-spectrum SPF 60 sunscreen with a velvety, fast-absorbing texture.",
      price: 2199,
      image: {
        filename: "anthelios-melt-in-milk-sunscreen",
      url :"https://m.media-amazon.com/images/I/619LhHSBBpL.jpg",
      },
      category: "Sunscreen",
      skinType: ["Normal", "Dry", "Sensitive", "Combination"],
      skinConcern: ["Sun Protection"],
      keyIngredients: "Avobenzone, Octocrylene",
      productFormat: "Lotion",
      volume: 150,
      whatMakesItPotent: "Powered by Cell-Ox Shield® technology, this SPF 60 sunscreen offers broad-spectrum UVA/UVB protection. The melt-in milk texture absorbs quickly and won't leave a greasy residue or white cast. Water-resistant and dermatologist-tested for even the most sensitive skin. Enriched with antioxidants to help defend against environmental damage. Ideal for face and body—your all-day sun defense solution."
    },
    {
      name: "Good Genes All-In-One Lactic Acid Treatment",
      brand: "Sunday Riley",
      description: "An all-in-one lactic acid treatment that exfoliates and brightens for a radiant complexion.",
      price: 5699,
      image: {
        filename: "good-genes-lactic-acid-treatment",
      url : "https://m.media-amazon.com/images/I/614T2q9ASeL.jpg", },
      category: "Exfoliant",
      skinType: ["Normal", "Oily", "Combination", "Dry"],
      skinConcern: ["Dullness",  "Fine Lines & Wrinkles"],
      keyIngredients: "Lactic Acid, Licorice Extract",
      productFormat: "Serum",
      volume: 30,
      whatMakesItPotent: "Contains purified lactic acid that exfoliates dead skin cells, smooths texture, and refines pores. Licorice and lemongrass brighten dullness while reducing the look of dark spots. Immediately plumps fine lines for a youthful glow. Its pH-balanced formula works overnight for glowing skin by morning. A cult-favorite for achieving radiant, luminous skin with consistent use."
    },
    {
      name: "Creamy Eye Treatment with Avocado",
      brand: "Kiehl's",
      description: "A rich and creamy under eye cream with avocado oil for all-day hydration.",
      price: 249,
      image: {
        filename: "creamy-eye-treatment-with-avocado",
      url :
      "https://m.media-amazon.com/images/I/61ZlS7A9jAL._SX679_.jpg", },
      category: "Eye Cream",
      skinType: ["Normal", "Dry", "Sensitive"],
      skinConcern: ["Dryness"],
      keyIngredients: "Avocado Oil, Shea Butter",
      productFormat: "Cream",
      volume: 14,
      whatMakesItPotent: "Infused with nourishing avocado oil and rich emollients, this creamy formula hydrates and soothes the delicate under-eye area. The unique texture prevents the product from migrating into eyes. Olive-derived beta-carotene protects against oxidative damage and dryness. Ophthalmologist- and dermatologist-tested. Wake up every morning with softer, smoother eyes that feel refreshed."
    },
    {
      name: "Super Volcanic Pore Clay Mask 2X",
      brand: "Innisfree",
      description: "A deep-cleansing creamy clay mask formulated with Jeju Super Volcanic Clusters to minimize the look of pores.",
      price: 699,
      image: {
        filename: "super-volcanic-pore-clay-mask-2x",
      url:
      "https://images-magento.shoppersstop.com/pub/media/catalog/product/S24INN678719_base/S24INN678719_NoColour/S24INN678719_NoColour_alt1.jpg_2000Wx3000H",
      },
      category: "Mask",
      skinType: ["Oily", "Combination", "Normal"],
      skinConcern: ["Acne"],
      keyIngredients: "Volcanic Ash, Lactic Acid",
      productFormat: "Balm",
      volume: 100,
      whatMakesItPotent: "Formulated with Super Volcanic Clusters™ from Jeju Island, this mask deeply absorbs sebum and purifies clogged pores. Lactic acid provides gentle exfoliating benefits for smoother skin texture. Cooling sensation tightens pores instantly. Balances excess oil without drying the skin. A perfect at-home detox treatment for acne-prone and combination skin in need of a refresh."
    },
    {
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      description: "A high-strength vitamin and mineral blemish formula that reduces the appearance of skin blemishes and congestion.",
      price: 599,
      image: {
        filename: "niacinamide-10-zinc-1",
      url :
      "https://www.clinikally.com/cdn/shop/files/11.Niacinamide10_FaceSerum01.jpg?v=1725605952&width=800",
      },
      category: "Serum",
      skinType: ["Oily", "Combination"],
      skinConcern: [ "Acne"],
      keyIngredients: "Niacinamide, Zinc PCA",
      productFormat: "Serum",
      volume: 30,
      whatMakesItPotent: "This high-strength serum contains 10% niacinamide, known for reducing acne, congestion, and enlarged pores. Zinc PCA helps control excess sebum and supports healing. Its lightweight texture absorbs quickly without clogging pores. Regular use improves clarity, evens skin tone, and balances oily skin. A perfect solution for those prone to breakouts and shine."
    },
    {
      name: "Squalane + Vitamin C Rose Oil",
      brand: "Biossance",
      description: "A luxuriously lightweight oil that brightens, firms, and evens skin tone.",
      price: 2499,
      image: {
        filename: "squalane-vitamin-c-rose-oil",
      url :
      "https://s9ldqad3n3.eu.scalesta-cdn.com/ESPF_Vc-ek7RgUtoUisSIIUhrB4=/fit-in/465x465/filters:format(webp):fill(fff)/www.styledotty.com/images/detailed/13/biossance_rose-.png",
      },
      category: "Serum",
      skinType: ["Normal", "Dry", "Combination"],
      skinConcern: ["Dullness", "Dryness", "Fine Lines & Wrinkles"],
      keyIngredients: "Squalane, Vitamin C, Rose Oil",
      productFormat: "Oil",
      volume: 30,
      whatMakesItPotent: "Featuring stable, oil-soluble Vitamin C, this serum visibly brightens and reduces dark spots over time. Nourishing squalane restores moisture, while rose oil calms and firms the skin. Lightweight, non-greasy, and fast-absorbing formula. Free from synthetic fragrance and harsh additives. Gives skin a dewy, radiant glow while improving elasticity and tone."
    },
    // 🧩 You can continue adding the rest of the entries following this detailed format.

    {
        name: "Fat Water Pore-Refining Toner Serum",
        brand: "Fenty Skin",
        description: "A 2-in-1 toner-serum combo that targets pores, improves the look of dark spots, brightens, and smooths.",
        price: 4459,
        image: {
          filename: "fat-water-pore-refining-toner-serum",
          url:
        "https://m.media-amazon.com/images/I/41xDQihEKzL.jpg",
        },
        category: "Toner",
        skinType: ["Normal", "Oily", "Combination"],
        skinConcern: ["Pores", "Dark Spots"],
        keyIngredients: "Niacinamide, Witch Hazel, Barbados Cherry",
        productFormat: "Lotion",
        volume: 150,
        whatMakesItPotent: "This toner-serum hybrid is powered by niacinamide to reduce pore size and dark spots. Witch hazel water controls oil without stripping moisture. Barbados cherry delivers Vitamin C for instant brightening. Lightweight, like water, but deeply nourishing like a serum. A multitasking skin-perfecter for smoother, even-toned skin."
      },
      {
        name: "Ultra Facial Cream",
        brand: "Kiehl's",
        description: "A 24-hour daily face moisturizer that leaves skin feeling soft, supple, and hydrated.",
        price: 567,
        image: {
          filename: "ultra-facial-cream",
        url:
         "https://www.kiehls.in/media/catalog/product/cache/562c93b51a3633e02dec1d197ab7954c/k/i/kiehls-face-cream-ultra-facial-cream-28ml-000-3605970720858-whip_2.jpg",
        },
         category: "Moisturizer",
        skinType: ["Normal", "Dry", "Sensitive", "Combination"],
        skinConcern: ["Dryness"],
        keyIngredients: "Glacial Glycoprotein, Squalane",
        productFormat: "Cream",
        volume: 50,
        whatMakesItPotent: "Infused with glacial glycoproteins, this cream replenishes moisture even in extreme conditions. Squalane helps restore the skin’s protective barrier without greasiness. Lightweight yet ultra-hydrating for 24-hour moisture. Clinically proven to strengthen skin while delivering continuous hydration. Perfect for dehydrated, flaky skin year-round."
      },
      {
        name: "Jet Lag Mask",
        brand: "Summer Fridays",
        description: "An enhanced, fragrance-free formula that nourishes, hydrates, and calms your skin.",
        price: 5433,
        image: {
          filename: "jet-lag-mask",
        url:
         "https://m.media-amazon.com/images/I/51GrRgl1vJL.jpg",
        },
        category: "Mask",
        skinType: ["Normal", "Dry", "Combination"],
        skinConcern: ["Dryness", "Dullness"],
        keyIngredients: "Niacinamide, Glycerin, Hyaluronic Acid",
        productFormat: "Cream",
        volume: 64,
        whatMakesItPotent: "This cult-favorite mask replenishes dry, tired-looking skin with niacinamide and hyaluronic acid. Glycerin soothes irritation and reinforces the moisture barrier. Works as an overnight mask or a 10-minute pick-me-up before makeup. Fragrance-free formula ideal for sensitive skin. Inspired by frequent travelers, designed for anyone needing hydration recovery."
      },
      {
        name: "C-Firma Day Serum",
        brand: "Drunk Elephant",
        description: "A potent vitamin C day serum packed with antioxidants, essential nutrients, and fruit enzymes.",
        price: 6599,
        image: {
          filename: "c-firma-day-serum",
        url :
        "https://m.media-amazon.com/images/I/614IAx7dRAL.jpg", 
        },
        category: "Serum",
        skinType: ["Normal", "Oily", "Combination", "Dry"],
        skinConcern: ["Fine Lines & Wrinkles", "Dullness"],
        keyIngredients: "Vitamin C, Ferulic Acid, Vitamin E",
        productFormat: "Serum",
        volume: 30,
        whatMakesItPotent: "Contains 15% L-ascorbic acid—the most effective form of Vitamin C—for brightening and antioxidant protection. Ferulic acid and Vitamin E enhance stability and fight environmental damage. Fruit enzymes resurface skin for improved texture. Leaves skin visibly firmer and more radiant. A daily antioxidant powerhouse for aging and dull skin."
      },
      {
        name: "Green Tea Seed Intensive Hydrating Serum",
        brand: "Innisfree",
        description: "A daily moisture-barrier strengthening serum, formulated with green tea tri-biotics.",
        price: 3433,
        image: {
          filename: "green-tea-seed-intensive-hydrating-serum",
        url :
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1123633/bFxercyK_T-1123633_5.jpg",
        },
        category: "Serum",
        skinType: ["Normal", "Dry", "Combination", "Sensitive"],
        skinConcern: ["Dryness"],
        keyIngredients: "Green Tea Extract, Hyaluronic Acid",
        productFormat: "Serum",
        volume: 80,
        whatMakesItPotent: "Rich in Jeju-grown green tea and probiotics, this serum revitalizes dry, depleted skin. Tri-biotics support a healthy skin microbiome and barrier. Hyaluronic acid adds instant hydration without heaviness. Fast-absorbing, non-tacky formula ideal for layering under moisturizer. A go-to for skin in need of nourishment, balance, and bounce."
      },
      {
        name: "Calendula Herbal-Extract Toner",
        brand: "Kiehl's",
        description: "An alcohol-free toner that gently soothes and refreshes skin.",
        price: 788,
        image: {
          filename: "calendula-herbal-extract-toner",
        url :
        "https://www.kiehls.in/media/catalog/product/cache/562c93b51a3633e02dec1d197ab7954c/1/_/1_2_.jpg",
        },
        category: "Toner",
        skinType: ["Normal", "Oily", "Sensitive"],
        skinConcern: ["Redness"],
        keyIngredients: "Calendula, Allantoin, Great Burdock Root",
        productFormat: "Lotion",
        volume: 250,
        whatMakesItPotent: "Infused with whole calendula petals, this toner visibly reduces redness and irritation. Allantoin and burdock root further soothe and balance sensitive or acne-prone skin. Alcohol-free and gentle—won’t sting or dry out your face. Delivers lightweight hydration and noticeably calmer, fresher skin. Suitable for daily use to prep and tone the skin naturally."
      },
      {
        name: "C.E.O. Glow Vitamin C + Turmeric Face Oil",
        brand: "Sunday Riley",
        description: "A face oil that recharges the radiance of your skin, infused with advanced Vitamin C and golden turmeric.",
        price: 599,
        image:{
          filename: "ceo-glow-vitamin-c-turmeric-face-oil",
        url :
         "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/sunday-riley/7016019/0/WEXFD4ioH5-1_Product_817494011661-Sunday-Riley-C_E_O_9e6fd9a32cf96b175396f11d3883fab1ef398368_1676527051.png",
        },
         category: "Serum",
        skinType: ["Normal", "Dry", "Combination"],
        skinConcern: ["Dullness", "Dark Spots"],
        keyIngredients: "Vitamin C, Turmeric, Ginger Root Extract",
        productFormat: "Oil",
        volume: 15,
        whatMakesItPotent: "Vitamin C (THD Ascorbate) delivers brightening and antioxidant power in a stable oil-soluble form. Turmeric and ginger extract calm inflammation and boost radiance. The oil absorbs quickly, leaving a glow without greasiness. Plumps and revitalizes stressed or dull complexions. The ultimate antioxidant-rich glow booster for all skin types."
      },
      {
        name: "Toleriane Double Repair Face Moisturizer",
        brand: "La Roche-Posay",
        description: "An oil-free face moisturizer that works in two ways: replenishes moisture and helps restore the skin's natural protective barrier.",
        price: 899,
        image: {
          filename: "toleriane-double-repair-face-moisturizer",
        url :
        "https://m.media-amazon.com/images/I/51x78epntaL.jpg",
        },
        category: "Moisturizer",
        skinType: ["Normal", "Combination", "Sensitive"],
        skinConcern: ["Dryness", "Redness"],
        keyIngredients: "Ceramides, Niacinamide, Glycerin",
        productFormat: "Cream",
        volume: 75,
        whatMakesItPotent: "Formulated with dermatologist-backed ingredients like ceramides and niacinamide to restore and calm sensitive skin. Glycerin hydrates deeply without clogging pores. Clinically proven to reinforce the skin barrier in 1 hour. Suitable for both morning and evening routines. Fragrance-free and ideal for those with rosacea, dryness, or sensitivity."
      },
      {
        name: "Soy Face Cleanser",
        brand: "Fresh",
        description: "A pH-balanced gel cleanser for all skin types that gently removes impurities and makeup.",
        price: 699,
        image:{
          filename: "soy-face-cleanser",
        url :
         "https://m.media-amazon.com/images/I/611CqqmWe8L.jpg",
        },
        category: "Cleanser",
        skinType: ["Normal", "Oily", "Combination", "Dry", "Sensitive"],
        skinConcern: ["Dryness"],
        keyIngredients: "Soy Proteins, Cucumber Extract, Rosewater",
        productFormat: "Gel",
        volume: 150,
        whatMakesItPotent: "This gentle gel cleanser maintains skin’s natural pH while effectively removing dirt and makeup—even mascara. Rich in soy proteins to improve elasticity and strengthen skin barrier. Calming cucumber extract cools the skin, while rosewater soothes and tones. Ideal for all skin types, including sensitive. A cult-favorite for gentle daily cleansing."
      },
      {
        name: "2% BHA Liquid Exfoliant",
        brand: "Paula's Choice",
        description: "A gentle, leave-on exfoliant with salicylic acid that unclogs pores and smooths wrinkles.",
        price: 349,
        image: {
          filename: "2-bha-liquid-exfoliant",
        url :
        "https://www.paulaschoice.in/cdn/shop/products/SKU2010_360x.png?v=1722493898", 
        },
        category: "Exfoliant",
        skinType: ["Oily", "Combination", "Normal"],
        skinConcern: ["Pores", "Acne"],
        keyIngredients: "Salicylic Acid (BHA), Green Tea Extract",
        productFormat: "Lotion",
        volume: 118,
        whatMakesItPotent: "Contains 2% salicylic acid to exfoliate inside the pores, reduce breakouts, and refine skin texture. Green tea extract calms irritation and provides antioxidant benefits. Lightweight, leave-on formula works without scrubbing. Helps improve blackheads, uneven tone, and roughness over time. A must-have for blemish-prone and congested skin."
      }
      
  ];
  
  module.exports = { data: sampleListings };
  