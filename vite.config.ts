import { defineConfig } from 'vite';
import pkg from "./package.json";
import path from "path"

export default defineConfig({
    // 配置选项
    root: '', // 设置项目根目录
    base: './', // 设置公共基础路径
    build: {
        minify: "esbuild", // 压缩代码
        rollupOptions: {
            input: {   // 入口文件
                "model": "src/index.ts",
            },
            output: {
                dir: "dist", // 输出目录
                format: "es",  // 打包文件格式
                entryFileNames: `[name]-${(pkg.version as any).replaceAll('.', '')}.js`, // 输出文件名称
            }
        }
    },
    server: {
        port: 8078, // 设置开发服务器端口
        host: "192.168.5.235", // 主机IP地址
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@pages": path.resolve(__dirname, "pages")
        }
    }
});