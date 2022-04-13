import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        NGA帖子：
        <a href="https://bbs.nga.cn/read.php?tid=28176186">
          桌面版生产模拟器 / 普通配方用求解器
        </a>
        <br />
        <br />
        新版生产模拟器/普通配方求解器（适配国服6.0）
        <a href="https://gitee.com/Tnze/ffxiv-best-craft/releases">下载</a>。
        <br />
        <br />
        Win11用户可下载“ffxiv-best-craft.exe”文件直接使用。
        <br />
        非Win11用户请下载“ffxiv-best-craft_x.x.x_x64_zh-CN.msi”或手动安装[WebView2]
        <br />
        MacOS用户请下载“ffxiv-best-craft_x.x.x_universal.dmg”
        <br />
        Linux用户请下载“ffxiv-best-craft_x.x.x_amd64.deb”或“ffxiv-best-craft_x.x.x_amd64.AppImage”
      </div>
    );
  }
}

export default App;
