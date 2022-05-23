/**
 * @author dajun.jiang
 * @description 引用 vant 移动端UI库
 */
import Vue from "vue";
import "vant/lib/button/style";
import {
  Button,
  Image as VanImage,
  Divider,
  Popup,
  Icon,
  Field,
  Checkbox,
  CheckboxGroup,
  Picker,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Sticky,
  List,
  Lazyload,
  Search,
  Tabs,
  Tab,
  Collapse,
  CollapseItem,
  Overlay,
  Popover,
  ImagePreview,
} from "vant";

const components = [
  Button,
  VanImage,
  Divider,
  Popup,
  Icon,
  Field,
  Checkbox,
  CheckboxGroup,
  Picker,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Sticky,
  List,
  Lazyload,
  Search,
  Tabs,
  Tab,
  Collapse,
  CollapseItem,
  Overlay,
  Popover,
  ImagePreview,
];

const initVant = () => {
  components.forEach((component) => {
    Vue.use(component);
  });
};

export default initVant;
