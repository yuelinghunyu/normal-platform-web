function DlWatermark(options) {
  this.options = Object.assign(
    {
      fontSize: 16,
      zIndex: 9999,
      padding: 30,
      height: 100,
      color: "#ccc",
      text: "蔚来已来",
      opacity: 1,
      scroll: false,
      fontWeight: 200,
      rotate: -30,
    },
    options
  );
  this.domNode = this.options.el
    ? document.getElementById(this.options.el)
    : document.body;
  this.initWaterMarker();
  this.monitor();
}

DlWatermark.prototype.initWaterMarker = function () {
  let text = document.createElement("span");
  text.innerHTML = this.options.text;
  text.id = "text";
  text.style.fontSize = this.options.fontSize + "px";
  document.body.appendChild(text);
  this.options.scroll && (this.domNode.style.position = "relative");
  this.options.width =
    document.getElementById("text").offsetWidth + this.options.padding * 2;
  this.options.height = this.options.height + this.options.padding * 2;
  document.body.removeChild(text);
  this.maskDiv = document.createElement("div");
  this.maskDiv.style.position = this.options.scroll ? "absolute" : "fixed";
  this.maskDiv.style.zIndex = this.options.zIndex;
  this.maskDiv.id = "watermark";
  this.maskDiv.style.top = "0";
  this.maskDiv.style.bottom = "0";
  this.maskDiv.style.left = "0";
  this.maskDiv.style.right = "0";
  this.maskDiv.style.height = "100%";
  this.maskDiv.style.width = "100%";
  this.maskDiv.style.pointerEvents = "none";
  const svgStr = `<svg
                        width="${this.options.width}"
                        height="${this.options.height}"
                        xmlns="http://www.w3.org/2000/svg" version="1.1"  style="transform: rotate(${this.options.rotate}deg) translateX(-${this.options.padding}px)">
                    <text
                            x="50%" y="50%"
                            text-anchor="middle"
                            fill="${this.options.color}" style="opacity:${this.options.opacity};font-family:-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif};font-size:${this.options.fontSize}px;font-weight: ${this.options.fontWeight};">${this.options.text}</text>
                </svg>`;
  const base64Url = `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(svgStr))
  )}`;
  this.maskDiv.style.background = "URL(" + base64Url + ")";
  this.domNode.appendChild(this.maskDiv);
};

DlWatermark.prototype.monitor = function () {
  let body = document.getElementsByTagName("body")[0];
  let options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  };
  let observer = new MutationObserver(callback);
  let self = this;
  observer.observe(body, options); // 监听body节点

  function callback(mutations) {
    if (mutations[0].target.id === "watermark") {
      self.domNode.removeChild(self.maskDiv);
    }
    if (mutations[0].attributeName === "id") {
      self.domNode.removeChild(self.maskDiv);
      self.initWaterMarker();
    }
    if (
      mutations[0].removedNodes[0] &&
      mutations[0].removedNodes[0].id === "watermark"
    ) {
      self.initWaterMarker();
    }
  }
};

export default DlWatermark;
