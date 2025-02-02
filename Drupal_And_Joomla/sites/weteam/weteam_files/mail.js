(function () {

    IHC.HostingMail = function (opts) {

        IHC.getJSON(IHC.Provider.Links.hostingOrder.getMailBox, {id: opts.id, mailId: opts.mailId}, function (data) {

            var markup = [], formId = "dialog" + Math.round(1000 + Math.random()*8999) + "-";

            if (data.error || !data.domains.length) {
                return;
            }

            /* конвертируем домены у всех емейлов в строке */
            if (data.cmd.redirect) {
                var redirectEmails = data.cmd.redirect.split(","), redirectParts, i;
                if (redirectEmails && redirectEmails.length) {
                    for (i = 0; i < redirectEmails.length; i++) {
                        redirectParts = redirectEmails[i].split("@");
                        if (redirectParts.length > 1) {
                            redirectEmails[i] = redirectParts[0] + "@" + IHC.IDN.decode(redirectParts[1]);
                        }
                    }
                    data.cmd.redirect = redirectEmails.join(",");
                }
            }

            markup.push('<div class="row">');
            markup.push('<label for="' + formId + 'account">Ящик</label>');
            markup.push('<input id="' + formId + 'account" name="account" type="text" value="' + (data.cmd.account || "") + '" style="width: 10em;" ' + (opts.mailId ? 'disabled="disabled"' : '') + ' />');
            markup.push(' @ <select name="domainId" style="width: 11.2em;" ' + (opts.mailId ? 'disabled="disabled"' : '') + '>');
            $.each(data.domains, function () {
                markup.push('<option value="' + this.id + '" ' + (this.id === data.cmd.domainId ? 'selected="selected"' : '') + '>' + IHC.IDN.decode(this.domain) + '</options>');
            });
            markup.push('</select></div>');



            markup.push('<div class="row">',
                    '<label for="' + formId + 'pass1">Пароль</label>',
                    '<input id="' + formId + 'pass1" name="pass1" type="password" value="' + (data.cmd.pass1 || "") + '" />',
                '</div>',
                '<div class="row">',
                    '<label for="' + formId + 'pass2">Повторите пароль</label>',
                    '<input id="' + formId + 'pass2" name="pass2" type="password" value="' + (data.cmd.pass2 || "") + '" />',
                '</div>',
                '<div class="row">',
                    '<input id="' + formId + 'keepMail" name="keepMail" type="checkbox" class="checkbox" ' + (data.cmd.keepMail || !data.cmd.redirect ? 'checked="checked"' : '') + ' /> ',
                    '<label for="' + formId + 'keepMail" class="checkbox">Сохранять почту в ящике</label>',
                    '<p class="keep-mail-hint hidden">Ваша текущая почта будет удалена</p>',
                '</div>',
                '<div class="row">',
                    '<input id="' + formId + 'redirectFlag" name="redirectFlag" type="checkbox" class="checkbox" ' + (data.cmd.redirectFlag || data.cmd.redirect ? 'checked="checked"' : '') + ' /> ',
                    '<label for="' + formId + 'redirectFlag" class="checkbox">Перенаправлять на</label> ',
                    '<input name="redirect" value="' + (data.cmd.redirect || '') + '" style="position: relative; top: 4px; width: 11em;" ' + (data.cmd.redirectFlag || data.cmd.redirect ? '' : 'disabled="disabled"') + ' />',
                '</div>');

            IHC.Dialog({
                title: opts.mailId ? "Редактирование почтового ящика" : "Создание почтового ящика",
                html: markup.join(''),
                submit: {
                    title: opts.mailId ? "Сохранить" : "Создать"
                },
                cancel: {
                    title: "Отменить"
                },
                url: opts.mailId ? IHC.Provider.Links.hostingOrder.updateMailBox : IHC.Provider.Links.hostingOrder.addMailBox,
                extras: {
                    id: opts.id,
                    mailId: opts.mailId
                },
                complete: function (data) {
                    $("#form-notice").remove();
                    $("#page").prepend('<div id="form-notice"><p>' + (data.error || data.message || "") + '</p></div>');
                    if ($.isFunction(opts.callback)) {
                        opts.callback();
                    }
                }
            });

            $("#" + formId + "redirectFlag").bind("change click", function () {
                $(this).siblings("input[name=redirect]")[this.checked ? 'removeAttr' : 'attr']("disabled", "disabled");
            });

            $("#" + formId + "keepMail").bind("change click", function () {
                if (data.cmd.keepMail || !data.cmd.redirect) {
                    $(this).siblings(".keep-mail-hint")[!this.checked ? 'removeClass' : 'addClass']('hidden');
                }
            });

        });
    };

}());