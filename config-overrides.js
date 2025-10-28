const webpack = require('webpack');

module.exports = function override(config, env) {
    if (!config.resolve) {
        config.resolve = {};
    }
    if (!config.resolve.fallback) {
        config.resolve.fallback = {};
    }

    // --- Perbaikan Akhir: Menggunakan FALSE untuk Modul yang Rusak ---
    // Ini mencegah require.resolve() dijalankan di tahap startup yang rentan
    config.resolve.fallback = {
        ...config.resolve.fallback,

        "path": false, 
        "os": false, 

        // Polyfills lain yang terbukti aman kita pertahankan
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "url": require.resolve("url/"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "process": require.resolve("process/browser")
    };

    // Plugins tetap sama
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser', 
        }),
    ]);

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
};