# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Linux 命令查询手册 - 一个简洁的 Linux 命令查询静态网站，提供命令语法、参数说明和使用示例。

部署地址：https://shell.luomor.com/

## Architecture

纯静态网站，无构建步骤：
- `index.html` - 主页面，包含搜索框、分类筛选、命令卡片列表和详情弹窗
- `css/style.css` - 样式，采用 CSS 变量和响应式设计
- `js/app.js` - 核心逻辑：加载 JSON 数据、搜索/筛选、渲染卡片和弹窗详情
- `data/commands.json` - 命令数据源（JSON 格式）

数据流：页面加载 → fetch JSON → 渲染卡片 → 用户搜索/筛选 → 实时更新列表 → 点击卡片显示详情弹窗

## Data Format

命令数据结构（data/commands.json）：
```json
{
  "commands": [
    {
      "name": "命令名",
      "category": "分类（文件管理/文本处理/系统管理/网络/帮助）",
      "description": "命令描述",
      "syntax": "命令语法",
      "options": [{ "flag": "选项", "description": "说明" }],
      "examples": [{ "cmd": "示例命令", "desc": "示例说明" }]
    }
  ]
}
```

## Common Commands

本项目为纯静态网站，无需构建：
- 本地开发：直接打开 `index.html` 或使用 `python3 -m http.server 8000`
- 部署：将全部文件上传至静态托管服务（GitHub Pages、Vercel、Netlify 等）

## SEO

已配置的 SEO 功能：
- Meta 标签（title, description, keywords）
- Open Graph / Twitter Cards
- JSON-LD 结构化数据（WebApplication + TechArticle）
- sitemap.xml 和 robots.txt
- 语义化 HTML 标签和 ARIA 属性
- 首屏 SEO 内容（初始渲染热门命令）
