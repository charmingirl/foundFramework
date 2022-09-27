export const      // 在console中显示信息
    copyRightConsole = function(packageInfo) {
        /* 样式代码 */
        const projectNameStyle = 'font-size: 20px;font-weight: 600;color: rgb(244,167,89);';
        const descriptionStyle = 'font-style: oblique;font-size:14px;color: rgb(244,167,89);font-weight: 400;';
        const versionStyle = 'color: rgb(30,152,255);padding:8px 0 2px;';
        const dateTimeStyle = 'color: rgb(30,152,255);padding:0 0 5px;';

        /* 内容代码 */
        const projectName = packageInfo.name || '';
        const description = packageInfo.description || '';
        const version = `版 本 号：${packageInfo.version} `;

        // 空格有意义，不要格式化
        console.log(`%c${description} %c${projectName}
%c${version}`, projectNameStyle, descriptionStyle, versionStyle, dateTimeStyle);
    }
