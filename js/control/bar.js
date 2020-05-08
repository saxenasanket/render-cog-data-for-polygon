/** Add search control to the map
 */
import Bar from 'ol-ext/control/Bar'
import Button from 'ol-ext/control/Button'
import map from '../map';
import dialog from '../dialog'

const bar = new Bar();
map.addControl(bar);

console.log(bar)
const editbar = new Bar({
  toggleOne: true
});
bar.addControl(editbar);

var hello = new Button ({
  html: '<i class="fa fa-info-circle"></i>',
  className: "hello",
  title: "Hello world!",
  handleClick: () => {
    dialog.show($(".about").html());
  }
});
bar.addControl(hello);

export {editbar}
export default bar