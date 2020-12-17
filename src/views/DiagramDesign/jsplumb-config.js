const commonConfig = {
  Container: "diagramContainer",
  // 是否打开jsPlumb的内部日志记录
  LogEnabled: false,
  isSource: true,
  isTarget: true,
  // connector: 连接样式 Bezier贝塞尔曲线(默认) Flowchart具有90度转折点的流程线 StateMachine状态机 Straight直线
  // Connector: ['Straight', {stub: 20, gap: 1}],
  Connector: ['Flowchart', {stub: 30, gap: 1, alwaysRespectStubs: false, midpoint: 0.5, cornerRadius: 10}],
  // Connector: ['StateMachine', {margin: 5, curviness: 10, proximityLimit: 80}],
  // Connector: ["Bezier", {curviness: 60}],
  // 默认拖动创建的连接线，可以再次拖动，让连接线断开。关闭触发这种行为
  ConnectionsDetachable: false,
  // 删除连接线的时候节点不删除
  DeleteEndpointsOnDetach: false,

  // 连线的两端端点类型：圆形，radius: 圆的半径，越大圆越大
  Endpoint: ['Dot', {radius: 6, cssClass: 'node-endpoint-dot'}],
  // 连线的两端端点类型：矩形，height: 矩形的高
  // Endpoint: ['Rectangle', {height: 20, width: 20}],
  // 图像端点
  // Endpoint: ['Image', {src: '...'}],

  // 动态锚点、位置自适应
  // Anchor: ["Top", "Right", "Bottom", "Left"],
  // 连线的两端端点样式：fill:颜色值，outlineWidth:外边线宽度
  EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1},
  // 连线的样式
  PaintStyle: {
    stroke: '#333', // 线的颜色
    strokeWidth: 1, // 线的粗细，值越大线越粗
    // 设置外边线的颜色，默认设置透明，这样别人就看不见了，增大连接线的点击范围
    outlineStroke: 'transparent',
    // 线外边的宽，值越大，线的点击范围越大
    outlineWidth: 6
  },

  // maxConnections 默认值1，也就是一个端点最多只能拉出一条连线
  // 如果设置成5，表示最多可以有5条连接
  // 不限制连线的数量，可以将maxConnections值设置为-1
  MaxConnections: -1,

  // overlays可以理解为遮罩层。遮罩层不仅仅可以设置箭头，也可以设置其他内容
  // overlays有五种类型
  // - Arrow 一个可配置的箭头
  // - Label 标签，可以在链接上显示文字信息
  // - PlainArrow 原始类型的箭头
  // - Diamond 菱形箭头
  // - Custom 自定义类型
  Overlays: [
    ['Arrow', {
      width: 10, // 箭头尾部的宽度
      length: 10, // 箭头尾部宽度，箭头的尾部到头部的距离
      location: 0.5, // 位置(0～1之间) 0.5表示箭头位于中间，1表示箭头设置在连线末端
      direction: 1, // 方向，1:表示向前(默认) -1:表示向后
      foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
    }],
    ['Label', {label: '', location: 0.5, cssClass: 'diagram-link-label'}]
  ],
};

export default commonConfig;
