const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "@nuxt/content:urls",
            "description": "Generated from your markdown files.",
            "tips": [
                "Enabled because you've set `config.strictNuxtContentPaths: true`."
            ]
        },
        "fetch": "/__sitemap__/nuxt-content-urls.json",
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/contact-us"
            },
            {
                "loc": "/delivery-policy"
            },
            {
                "loc": "/help-faqs"
            },
            {
                "loc": "/"
            },
            {
                "loc": "/order-history"
            },
            {
                "loc": "/returns"
            },
            {
                "loc": "/track-order"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
