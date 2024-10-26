(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Header.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"header\">\r\n    <div class=\"header__logo-container\">\r\n        <img src=\"../../images/logo.png\" class=\"header__logo-container__img\">\r\n    </div>\r\n    <div class=\"header__account-container\">\r\n        <button class=\"header__account-container__button\">Войти</button>\r\n    </div>\r\n</div>";
},"useData":true});
})();