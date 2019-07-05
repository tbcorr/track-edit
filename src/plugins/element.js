import Vue from 'vue';
import { Button, ButtonGroup, Row, Col, Container, Main, Aside, Card, Collapse, CollapseItem, ColorPicker, Divider } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(ColorPicker);
Vue.use(Divider);