# Linux 命令查询手册

一个简洁易用的 Linux 命令查询网站，提供命令语法、参数说明和使用示例。

## 功能特点

- 🔍 **实时搜索** - 快速查找命令名称、描述、参数
- 📂 **分类筛选** - 按文件管理、文本处理、系统管理、网络等分类浏览
- 📖 **详细文档** - 每个命令包含语法、参数选项、使用示例
- ⌨️ **键盘快捷键** - 按 `/` 键快速聚焦搜索框
- 📱 **响应式设计** - 支持手机、平板、桌面端

## 项目结构

```
linux-shell/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── app.js          # 交互逻辑
├── data/
│   └── commands.json   # 命令数据
└── README.md           # 项目说明
```

## 使用方法

### 本地运行

直接用浏览器打开 `index.html` 文件即可，或使用本地服务器：

```bash
# 使用 Python 内置服务器
python3 -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server -p 8000
```

然后访问 `http://localhost:8000`

### 部署

可以将整个项目部署到任何静态网站托管服务：
- GitHub Pages
- Vercel
- Netlify
- Apache/Nginx 服务器

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `/` | 聚焦搜索框 |
| `Esc` | 关闭弹窗 |

## 命令分类

| 分类 | 说明 |
|------|------|
| 文件管理 | ls, cd, mkdir, rm, cp, mv, find, tar 等 |
| 文本处理 | grep, awk, sed, sort, cut, wc 等 |
| 系统管理 | ps, top, kill, df, du, free, chmod 等 |
| 网络 | ssh, curl, wget, ping, netstat, scp 等 |
| 帮助 | man, help 等 |

## 添加新命令

编辑 `data/commands.json` 文件，按以下格式添加：

```json
{
  "name": "命令名",
  "category": "分类",
  "description": "命令描述",
  "syntax": "命令语法",
  "options": [
    { "flag": "-h", "description": "选项说明" }
  ],
  "examples": [
    { "cmd": "命令 示例", "desc": "示例说明" }
  ]
}
```

## 参考资料

- [菜鸟教程 Linux Shell](https://www.runoob.com/linux/linux-shell.html)
- [tldr-pages](https://github.com/tldr-pages/tldr)
- [Linux man pages](https://man7.org/linux/man-pages/)

## License

MIT
