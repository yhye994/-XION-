# XION账户地址批量生成工具

这是一个基于CosmJS的Node.js脚本，用于批量生成XION区块链账户地址，并将生成的地址和助记词保存为Excel文件（`xion_accounts.xlsx`）。每个账户包含一个XION地址（以`xion`开头）和对应的24个单词助记词，适用于XION测试网或主网。

## 项目功能
- 批量生成XION区块链账户地址和助记词。
- 将生成结果保存为Excel文件，格式为：
  - 列A（`Address`）：XION账户地址，如`xion1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0`。
  - 列B（`Mnemonic`）：24个单词的助记词，如`word1 word2 ... word24`。
- 支持自定义生成账户数量和输出文件名。
- 提供错误处理和日志输出，便于调试。

## 环境要求
- **Node.js**：版本16或以上。
- **操作系统**：Windows、macOS或Linux。
- **依赖库**：`@cosmjs/stargate`、`@cosmjs/proto-signing`、`@cosmjs/encoding`、`xlsx`、`dotenv`。

## 安装步骤
1. **创建项目目录**：
   ```bash
   mkdir xion-batch-accounts
   cd xion-batch-accounts
   ```

2. **初始化Node.js项目**：
   ```bash
   npm init -y
   ```

3. **安装依赖**：
   ```bash
   npm install @cosmjs/stargate @cosmjs/proto-signing @cosmjs/encoding dotenv xlsx
   ```

4. **配置环境变量**：
   - 在项目根目录创建`.env`文件，添加XION网络的RPC端点和链ID。例如：
     ```env
     XION_RPC_URL=https://rpc.xion-testnet-2.burnt.com:443
     CHAIN_ID=xion-testnet-2
     ```
   - 测试网RPC和链ID可从[XION官方文档](https://docs.burnt.com/)获取，主网需使用相应参数。

5. **添加脚本**：
   - 将本仓库中的`batch-create-accounts.js`文件复制到`xion-batch-accounts`目录。

## 使用方法
1. **运行脚本**：
   ```bash
   node batch-create-accounts.js
   ```

2. **自定义配置**（可选）：
   - 打开`batch-create-accounts.js`，修改以下参数：
     ```javascript
     const accountCount = 10; // 账户数量
     const outputFile = "xion_accounts.xlsx"; // 输出文件名
     ```

3. **输出结果**：
   - 脚本运行后，将在项目目录生成`xion_accounts.xlsx`文件。
   - 文件格式：
     | Address                                    | Mnemonic                                                                 |
     |--------------------------------------------|--------------------------------------------------------------------------|
     | xion1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0 | word1 word2 ... word24                                             |
     | xion1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0 | word1 word2 ... word24                                             |
   - 控制台将打印生成的账户信息，便于验证。

## 代码说明
- **核心逻辑**：使用`@cosmjs/proto-signing`的`DirectSecp256k1HdWallet`生成24个单词助记词和XION地址（Bech32编码，`xion`前缀）。
- **Excel输出**：通过`xlsx`库将地址和助记词保存为Excel表格，列宽已优化以确保清晰显示。
- **错误处理**：捕获生成和保存过程中的错误，输出详细错误信息。
- **安全性**：助记词是私钥的来源，生成的`xion_accounts.xlsx`需妥善保存，建议加密存储。

