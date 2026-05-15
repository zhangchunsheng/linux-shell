// Linux 命令查询手册 - 主脚本

let commandsData = [];
let filteredCommands = [];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    loadCommands();
    setupEventListeners();
});

// 加载命令数据
async function loadCommands() {
    try {
        const response = await fetch('data/commands.json');
        const data = await response.json();
        commandsData = data.commands;
        filteredCommands = [...commandsData];
        renderCommands(filteredCommands);
        updateResultsCount();
    } catch (error) {
        console.error('加载命令数据失败:', error);
        document.getElementById('commandsList').innerHTML = `
            <div class="no-results">
                <h3>加载失败</h3>
                <p>无法加载命令数据，请检查文件是否存在。</p>
            </div>
        `;
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索输入
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    // 分类筛选
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', handleFilter);

    // 模态框关闭
    const modalClose = document.querySelector('.modal-close');
    modalClose.addEventListener('click', closeModal);

    // 点击模态框背景关闭
    const modal = document.getElementById('commandModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按 / 键聚焦搜索框
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        // 按 ESC 关闭模态框
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 处理搜索
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const category = document.getElementById('categoryFilter').value;

    filteredCommands = commandsData.filter(cmd => {
        const matchesSearch = !searchTerm ||
            cmd.name.toLowerCase().includes(searchTerm) ||
            cmd.description.toLowerCase().includes(searchTerm) ||
            cmd.syntax.toLowerCase().includes(searchTerm) ||
            cmd.options.some(opt => opt.description.toLowerCase().includes(searchTerm)) ||
            cmd.examples.some(ex => ex.desc.toLowerCase().includes(searchTerm));

        const matchesCategory = category === 'all' || cmd.category === category;

        return matchesSearch && matchesCategory;
    });

    renderCommands(filteredCommands);
    updateResultsCount();
}

// 处理分类筛选
function handleFilter() {
    handleSearch(); // 重用搜索逻辑
}

// 渲染命令列表
function renderCommands(commands) {
    const container = document.getElementById('commandsList');

    if (commands.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>😕 没有找到匹配的命令</h3>
                <p>尝试其他搜索词或清除筛选条件</p>
            </div>
        `;
        return;
    }

    container.innerHTML = commands.map(cmd => `
        <div class="command-card" data-command="${cmd.name}" onclick="showCommandDetail('${cmd.name}')">
            <span class="command-category">${cmd.category}</span>
            <div class="command-name">${cmd.name}</div>
            <div class="command-desc">${cmd.description}</div>
            <div class="command-syntax">${escapeHtml(cmd.syntax)}</div>
            <div class="quick-preview">
                <strong>${cmd.options.length}</strong> 个参数选项 ·
                <strong>${cmd.examples.length}</strong> 个示例
            </div>
        </div>
    `).join('');
}

// 更新结果计数
function updateResultsCount() {
    document.getElementById('resultsCount').textContent = `共 ${filteredCommands.length} 个命令`;
}

// 显示命令详情
function showCommandDetail(commandName) {
    const cmd = commandsData.find(c => c.name === commandName);
    if (!cmd) return;

    const modal = document.getElementById('commandModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-body">
            <span class="category-tag">${cmd.category}</span>
            <h2>${cmd.name}</h2>
            <div class="description">${cmd.description}</div>

            <div class="modal-section">
                <h3>语法</h3>
                <code class="command-syntax" style="display: block; padding: 15px; background: var(--code-bg); color: var(--code-text); border-radius: 8px;">${escapeHtml(cmd.syntax)}</code>
            </div>

            <div class="modal-section">
                <h3>参数选项</h3>
                <table class="options-table">
                    <thead>
                        <tr>
                            <th>选项</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cmd.options.map(opt => `
                            <tr>
                                <td><span class="flag">${escapeHtml(opt.flag)}</span></td>
                                <td>${opt.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="modal-section">
                <h3>使用示例</h3>
                <ul class="examples-list">
                    ${cmd.examples.map(ex => `
                        <li>
                            <div class="example-cmd">${escapeHtml(ex.cmd)}</div>
                            <div class="example-desc">${ex.desc}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('commandModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// HTML 转义工具函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
