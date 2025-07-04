const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const XLSX = require("xlsx");
const fs = require("fs");

// 配置XION地址前缀
const XION_PREFIX = "xion";

// 批量生成指定数量的账户并保存到Excel
async function batchCreateAccounts(count, outputFile = "xion_accounts.xlsx") {
    const accounts = [];

    try {
        // 生成账户
        for (let i = 0; i < count; i++) {
            const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: XION_PREFIX });
            const [account] = await wallet.getAccounts();

            accounts.push({
                Address: account.address,
                Mnemonic: wallet.mnemonic
            });
        }

        // 转换为Excel格式
        const worksheet = XLSX.utils.json_to_sheet(accounts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "XION Accounts");

        // 设置列宽（可选，美化输出）
        worksheet["!cols"] = [
            { wch: 45 }, // Address列宽
            { wch: 150 } // Mnemonic列宽
        ];

        // 保存Excel文件
        XLSX.writeFile(workbook, outputFile);
        console.log(`Successfully generated ${count} XION accounts and saved to ${outputFile}`);
        
        return accounts; // 返回账户列表以便进一步处理
    } catch (error) {
        console.error("Error generating or saving accounts:", error.message);
        throw error;
    }
}

// 主函数
(async () => {
    try {
        const accountCount = 200; // 可修改为需要的账户数量
        const outputFile = "xion_accounts.xlsx"; // 输出文件名
        const accounts = await batchCreateAccounts(accountCount, outputFile);

        // 打印生成的账户（可选）
        console.log(`Generated ${accountCount} XION accounts:`);
        accounts.forEach((account, index) => {
            console.log(`Account ${index + 1}:`);
            console.log(`  Address: ${account.Address}`);
            console.log(`  Mnemonic: ${account.Mnemonic}`);
            console.log("---");
        });
    } catch (error) {
        console.error("Failed to execute batch creation:", error.message);
    }
})();