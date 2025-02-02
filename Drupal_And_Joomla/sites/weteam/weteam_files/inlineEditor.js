(function () {
    IHC.inlineEditor = function (name, url) {
        // Allow instantiation without the new operator
        if (!(this instanceof IHC.inlineEditor)) {
            return new IHC.inlineEditor(name, url);
        } else {
            // set up the widget
            this._init(name, url);
            return this;
        }
    };

    IHC.inlineEditor.prototype = {
        _init: function (name, url) {
            var me = this,
                bound = false,
                pass, link;

            me.name = name;
            me.url = url + '/update' + name.replace(/^.|-./g, function($1) {
                return $1.toUpperCase();
            }).replace("-", "");

            me.block = $('.'+name);
            me.submit = $('<span class="submit-link" title="Сохранить" />')
                .click(function () {
                    me.update();
                    return false;
                });

            me.input = $('.' + name + "__input", me.block)
                .after(me.submit)
                .click(function (e) {
                    e.stopPropagation();
                })
                .keydown(function (e) {
                    var key = e.keyCode || e.which;
                    if (key == 13 && link.is(":hidden")) {
                        me.update();
                        return false;
                    }
                    if (key == 27 && link.is(":hidden")) {
                        me.cancel();
                        return false;
                    }
                });

            me.link = $('.' + name + '__link', me.block)
                .click(function (e) {
                    e.stopPropagation();
                    me.block.addClass(name + "_edit");
                    link = $(this);
                    pass = link.html();
                    if (me.oldValue)
                        me.input.val(me.oldValue);
                    else
                        me.oldValue = me.input.val();
                    link.html(me.oldValue);
                    var size = link.width() + 2;
                    me.input.width(size < 35 ? 35 : size).focus();
                    link.html(pass);

                    if (!bound) {
                        bound = true;
                        $('html').click(function () {
                            me.cancel();
                        });
                    }
                });
        },

        cancel: function () {
            var me = this;
            if (!(me.dialog && me.dialog.dialog("isOpen"))) {
                me.block.removeClass(me.name + "_edit");
            }
        },

        update: function () {
            var me = this;
            if (me.input.val() == me.oldValue) {
                me.cancel();
                return;
            }
            $.ajax({
                type: "post",
                cache: "false",
                url: me.url,
                data: {value: me.input.val()},
                dataType: "json",
                error: function () {
                    me.showError("Ошибка при отправке запроса. Повторите действие позже.")
                },
                success: function (response) {
                    if (response.error) {
                        me.showError(response.error);
                    } else {
                        me.oldValue = me.input.val();
                        me.cancel();
                    }
                }
            });
        },

        showError: function (error) {
            var me = this;
            me.dialog = $("<p>" + error + "</p>")
                .dialog({
                    title: "Ошибка",
                    modal: true,
                    close: function (e) {
                        me.input.focus();
                    }
                })
        }
    }
}());