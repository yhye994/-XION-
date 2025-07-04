一个基于CosmJS的脚本 用于批量生成XION账户地址。参考了XION官方文档中的代码片段
环境设置安装依赖：
1.在Node.js环境中，执行以下代码安装CosmJS相关库：

mkdir xion-batch-accounts
cd xion-batch-accounts
npm init -y
npm install @cosmjs/stargate @cosmjs/proto-signing @cosmjs/encoding dotenv
npm install xlsx @cosmjs/proto-signing

2.将此仓库中的.env文件（存储XION网络的RPC端点 测试网或主网）存放至 xion-batch-accounts 文件夹子目录下。
3.将此仓库中的 batch-create-accounts.js 文件存放至 xion-batch-accounts 文件夹子目录下。
4.运行脚本
node batch-create-accounts.js
运行后，你将在项目目录找到xion_accounts.xlsx，格式如下：列A（Address）：XION账户地址，如xion1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0。
列B（Mnemonic）：24个单词的助记词，如word1 word2 ... word24。
