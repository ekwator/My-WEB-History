/**
 * Диалоговое окно
 * Параметры и пример использования
    IHC.Dialog({
        title: "Создать PTR",
        form: [{
            label: "Label 1",
            value: "old value",
            readonly: true,
            type: password    //(по умолчанию text)
        }, {
            label: "Label 2",
            name: "othername",
            value: "new value"
        }, {
            label: "Label for select",
            name: "name for select",
            options: [{text:"option 1 text", value:"option 1 value", selected:true},
                      {text:"option 2 text", value:"option 2 value", selected:true}]
        }],
        submit: {
            title: "Сохранить"
        },
        cancel: {
            title: "Отменить"
        },
        processData: function (data) {
        },
        url: "/panel/hostingOrder/sites",
        extras: {
            id: 1031,
            ipId: 90
        },
        complete: function (data) {
            alert(data);
        },
        onError: function (data) {
            alert(data);
        },
        // Вместо отправки формы по url
        onSubmit: function (data) {
            alert(data);
        }
    });
 */

(function () {

    IHC.Dialog = function (opts) {
        // Allow instantiation without the new operator
        if (!(this instanceof IHC.Dialog)) {
            return new IHC.Dialog(opts);
        } else {
            // set up the widget
            this._init(opts);
            return this;
        }
    };

    IHC.Dialog.prototype = {

        _init: function (opts) {

            var me = this, ele, obj = [];

            // wrapper
            obj.push('<div><form>');
            // server response holder
            obj.push('<div class="message' + (opts.message ? '' : ' hidden') + '" style="padding-bottom: 1em;">',
                        opts.message,
                    '</div>');
            // form holder
            obj.push('<div class="fields-holder">');

            if (opts.form) {
                $.each(opts.form, function () {
                    var id = IHC.savepoint(this),
                        value = "" + this.value;
                    if (typeof this === "object" && this.label) {
                        obj.push('<div class="row">');
                        obj.push(' <label for="' + id + '">', this.label, '</label> ');
                        if (this.options) {
                            obj.push('<select' + (this.name ? ' name="' + this.name + '"' : '') + '>');
                            $.each(this.options, function () {
                                obj.push('<option' + (this.value ? ' value="' + this.value + '"' : '') + (this.selected ? ' selected' : '')+'>' + ( this.text ? this.text : '') + '</option>');
                            })
                            obj.push('</select>');
                        }
                        else {
                            if (this.readonly) {
                                obj.push('<span class="readonly"' + (this.name ? ' name="' + this.name + '"' : '') + '>', (value ? value : '&nbsp;'), '</span>');
                            } else {
                                if (this.prefix) {
                                    obj.push("<strong>" + this.prefix + "</strong>");
                                }
                                obj.push('<input class="' + (this.prefix ? 'short' : '') + '" type="' + (this.type ? this.type : 'text') + '"' + (this.name ? ' name="' + this.name + '"' : '') + ' value="' + value + '" />');
                            }
                        }
                        obj.push('</div>');
                    } else {
                        obj.push('<p>' + this + '</p>');
                    }
                });
            } else if (opts.html) {
                obj.push(opts.html);
            }

            // end of form holder
            obj.push('</div>');

            if (opts.submit || opts.cancel) {
                // button holder
                obj.push('<div class="submit-holder">');
                if (opts.cancel) {
                    obj.push('<span class="btn btn-secondary');
                    if (opts.cancel.disabled) {
                        obj.push(' btn-disabled');
                    }
                    obj.push('"><span><input ');
                    if (opts.cancel.disabled) {
                        obj.push('disabled="disabled" ');
                    }
                    obj.push('type="button" value="' + opts.cancel.title + '" /></span></span>');
                }
                if (opts.submit) {
                    obj.push('<span class="btn');
                    if (opts.submit.disabled) {
                        obj.push(' btn-disabled');
                    }
                    obj.push('"><span><input ');
                    if (opts.submit.disabled) {
                        obj.push('disabled="disabled" ');
                    }
                    obj.push('type="submit" value="' + opts.submit.title + '" /></span></span>');
                }
                // end of button holder
                obj.push('</div>');
            }

            // end of wrapper
            obj.push('</form></div>');

            ele = $(obj.join('')).appendTo("body");

            me.dialog = ele.dialog({
                close: function (e, ui) {
                    me.dialog.remove();
                },
                title: opts.title,
                width: opts.width || 600,
                minWidth: 500,
                resizable: true,
                modal: true
            });

            me._bind(opts);
        },

        _bind: function (opts) {

            var me = this,
                dialog = me.dialog;

            dialog.find("span.btn.btn-secondary").bind("click", function () {
                dialog.dialog("close");
            });

            dialog.find("form").bind("submit", function () {
                if (dialog.find("span.btn:not(.btn-secondary):not(.btn-disabled)").length > 0)
                    me.request(opts);
                return false;
            });
        },

        request: function (opts) {
            var me = this,
                props = $.extend({}, opts.extras);

            // collect form properties
            $("div.row :input:enabled").each(function () {
                var name = $(this).attr("name");
                if (name) {
                    if ($(this).attr("checked") || $(this).attr("type") != "checkbox") {
                        props[name] = $(this).val();
                    }
                }
            });

            if ($.isFunction(opts.processData)) {
                props = opts.processData.call(me, props);
            }

            if ($.isFunction(opts.onSubmit)) {
                opts.onSubmit.call(me, props);
                me.dialog.dialog("close");
            } else {

                me.showMessage("Выполняю запрос&hellip;", true);

                $.ajax({
                    type: "post",
                    cache: "false",
                    url: opts.url,
                    data: props,
                    dataType: "json",
                    error: function () {
                        me.showError("Ошибка при отправке запроса. Повторите действие позже.");
                    },
                    success: function (response) {
                        if (response) {
                            if (response.error) {
                                me.showError(response.error, true);
                                if ($.isFunction(opts.onError)) {
                                    opts.onError.call(me, response);
                                }
                            } else {
                                if ($.isFunction(opts.complete)) {
                                    opts.complete.call(me, response);
                                }
                                me.dialog.dialog("close");
                            }
                        } else {
                            me.showError("Ошибка при отправке запроса. Повторите действие позже.");
                        }
                    }
                });
            }
        },


        showMessage: function (msg, stay, error) {
            var me = this,
                holder = me.dialog.find("div.message");

            holder.html(msg).removeClass("hidden");
            if (error) {
                holder.addClass("error");
            } else {
                holder.removeClass("error");
            }

            if (me.timer) {
                clearTimeout(me.timer);
                me.timer = null;
            }

            if (!stay) {
                me.timer = setTimeout(function () {
                    holder.addClass("hidden");
                }, 3000);
            }
        },

        showError: function (msg, stay) {
            var me = this;
            me.showMessage(msg, stay, true);
        }

    };


}());
