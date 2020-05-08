/** Affichage dans un dialogue
 */

const d = $("<div>").attr('id','dialog')
      .hide()
      .css({
        "position": "fixed",
        "top": "35%",
        "left": "50%",
        "transform": "translate(-50%,-35%)"
      })
      .appendTo('body');

const closeBox = $("<i>").addClass("closeBox")
      .click(() => { d.hide(); })
      .appendTo(d);
const content = $("<div>").appendTo(d);

const dialog = {
  show: function(html, title) {
    const c = $("<div>");
    if (title) c.append($("<h1>").text(title));
    c.append(html);
    content.html(c);
    $("button",c).click(() => {
      this.hide();
    });
    d.show();
  },
  hide: function(html) {
    d.hide();
  }
};

export default dialog