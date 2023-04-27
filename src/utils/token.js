// 操作登录后服务器返回的token令牌。注意：每次登录服务器返回的都是不一样的token。

export const setToken = (token) => {
    // 存储在本地内存可以实现自动登录，除非关闭页面时手动退出登录清除其中的token  会话内存无法实现自动登录
    localStorage.setItem("TOKEN", token)
    return "ok"
}

export const getToken = () => {
    // 没有token返回空字符串 !null=>true
    if (!localStorage.getItem("TOKEN")) return ""
    return localStorage.getItem("TOKEN") || ""
}

export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}