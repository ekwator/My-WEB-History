$(function () {

    var orderTabsWrapper = $("div.tabs-wrapper");
    if (!orderTabsWrapper.length) {
        // no tabs. not active product
        return;
    }

    var orderId = orderTabsWrapper.metadata().id;

    var pages = [
        new IHC.HostingOrder.Sites($("#sites-table"), orderId),
        new IHC.HostingOrder.Database($("#db-table"), orderId),
        new IHC.HostingOrder.MailBoxes($("#mail-table"), orderId),
        new IHC.HostingOrder.FtpAccounts($("#ftpaccount-table"), orderId),
        new IHC.HostingOrder.SubDomains($("#subdomain-table"), orderId),
        new IHC.HostingOrder.Cron($("#cronjobs-table"), orderId),
        new IHC.HostingOrder.Stats($("#statistics-table"), orderId)
    ];

    $("dl.tabs dt").bind("click", function () {
        var thisObj = $(this)
        if (thisObj.hasClass("reload-btn")) {
            thisObj = thisObj.siblings(".active").first();
            thisObj.removeClass('active');
        } else {
            var path = thisObj.get(0).className.match(/tab-(\w+)/)[1];
            if ($.History.getHash() || path != 'sites') {
                $.History.go(path);
            }
        }

        if (!thisObj.hasClass("active")) {
            thisObj
                .siblings().removeClass('active').end()
                .next('dd').andSelf().addClass('active');

            var index = thisObj.parent().find("dt").index(thisObj);
            if (index >= 0) {
                (function (tab) {

                    var layer = $("<div></div>").css({
                        height: tab.height(),
                        width: tab.width(),
                        background: "white",
                        position: "absolute",
                        top: 0,
                        opacity: 0.8
                    }).appendTo(tab);

                    pages[index].init(function () {
                        layer.remove();
                    });

                }(thisObj.next('dd')));
            }
        }
    });

    $.History.bind(function (state) {
        var ele = $("dl.tabs dt.tab-" + state);
        if (ele.length > 0) {
            ele.trigger("click");
        } else {
            $("dl.tabs dt.tab-sites").trigger("click");
        }
    });

    if (!$.History.getHash()) {
        $("dl.tabs dt.tab-sites").trigger("click");
    }

    /**
     * Динамические формы
     */
    function renderNotice(msg) {
        $("#form-notice").remove();
        $("#page").prepend('<div id="form-notice"><p>' + msg + '</p></div>');
    }

    $("a.dialog-pass").bind("click", function () {

        var ele = $(this),
            props = $(this).metadata();

        $.getJSON(this.href, function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            IHC.Dialog({
                title: "Смена главного пароля хостинга",
                form: [{
                    label: "Новый пароль",
                    value: "",
                    name: "pass1",
                    type: "password"
                }, {
                    label: "Повторите пароль",
                    value: "",
                    name: "pass2",
                    type: "password"
                }],
                submit: {
                    title: "Изменить"
                },
                cancel: {
                    title: "Отменить"
                },
                url: props.action,
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                }
            });

        });

        return false;
    });


    $("a.dialog-dbpass").live("click", function () {

        var ele = $(this);

        $.getJSON(this.href, function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            IHC.Dialog({
                title: "Смена пароля базы " + data.dbName,
                form: [{
                    label: "Новый пароль",
                    value: "",
                    name: "pass1",
                    type: "password"
                }, {
                    label: "Повторите пароль",
                    value: "",
                    name: "pass2",
                    type: "password"
                }],
                submit: {
                    title: "Изменить"
                },
                cancel: {
                    title: "Отменить"
                },
                url: data.action,
                extras: {
                    id: data.id,
                    dbId: data.dbId
                },
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                }
            });

        });

        return false;
    });

    $("a.dialog-ftppass").live("click", function () {

        var ele = $(this);

        $.getJSON(this.href, function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            IHC.Dialog({
                title: "Смена пароля FTP пользователя " + data.ftpName,
                form: [{
                    label: "Новый пароль",
                    value: "",
                    name: "pass1",
                    type: "password"
                }, {
                    label: "Повторите пароль",
                    value: "",
                    name: "pass2",
                    type: "password"
                }],
                submit: {
                    title: "Изменить"
                },
                cancel: {
                    title: "Отменить"
                },
                url: data.action,
                extras: {
                    id: data.id,
                    ftpId: data.ftpId
                },
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                }
            });

        });

        return false;
    });

    $("a.dialog-ftpdir").live("click", function () {

        var ele = $(this);

        $.getJSON(this.href, function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            IHC.Dialog({
                title: "Смена рабочей директории FTP пользователя " + data.ftpName,
                width: 700,
                form: [{
                    label: "Текущий путь",
                    value: "/home/p" + data.id + "/" + (data.current.dir ? data.current.dir + "/" : ""),
                    readonly: true
                }, {
                    label: "Новый путь",
                    prefix: "/home/p" + data.id + "/",
                    value: "",
                    name: "dir"
                }],
                submit: {
                    title: "Изменить"
                },
                cancel: {
                    title: "Отменить"
                },
                url: data.action,
                extras: {
                    id: data.id,
                    ftpId: data.ftpId
                },
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                }
            });

        });

        return false;
    });


    $("a.dialog-mailpass").live("click", function () {

        var ele = $(this);

        IHC.HostingMail(ele.metadata());

        return false;
    });


    $("a.dialog-aliases").live("click", function () {

        var ele = $(this);

        $.getJSON(IHC.Provider.Links.hostingOrder.aliases, ele.metadata(), function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            var markup = [], formId = "dialog" + Math.round(1000 + Math.random()*8999) + "-";

            markup.push('<div class="row">');
            markup.push('<label for="' + formId + 'aliases">Псевдонимы</label>');
            markup.push('<textarea id="' + formId + 'aliases" name="aliases" rows="10">');
            markup.push(IHC.IDN.decode(data.cmd.aliases) ||  "");
            markup.push('</textarea>');
            markup.push('</div>');

            IHC.Dialog({
                title: data.cmd.aliases ? 'Изменение псевдонимов сайта ' + IHC.IDN.decode(data.siteName) : 'Создание псевдонимов сайта ' + IHC.IDN.decode(data.siteName),
                html: markup.join(''),
                submit: {
                    title: data.cmd.aliases ? "Изменить" : "Создать"
                },
                cancel: {
                    title: "Отменить"
                },
                url: data.action,
                processData: function (data) {
                    // обработка параметров перед отправкой
                    data.aliases = IHC.IDN.encode(data.aliases || "");
                    return data;
                },
                extras: {
                    id: data.id,
                    siteId: data.siteId
                },
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                }
            });

        });

        return false;

    });


    $("a.dialog-addsites").live("click", function () {

        var ele = $(this);

        $.getJSON(IHC.Provider.Links.hostingOrder.addSites, ele.metadata(), function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            var markup = [], formId = "dialog" + Math.round(1000 + Math.random()*8999) + "-";

            markup.push('<div class="row bad hide"><div class="row-w">');
            markup.push('<label for="' + formId + 'badsites">Сайты с ошибками</label>');
            markup.push('<textarea id="' + formId + 'badsites" name="badsites" rows="10">');
            markup.push('</textarea>');
            markup.push('</div></div>');
            markup.push('<div class="row good">');
            markup.push('<label for="' + formId + 'sites">Сайты</label>');
            markup.push('<textarea id="' + formId + 'sites" name="sites" rows="10">');
            markup.push('</textarea>');
            markup.push('</div>');
            markup.push('<div><p>Вы можете добавить до ' + data.limit + ' сайтов одновременно.</p>');
            markup.push('</div>');

            IHC.Dialog({
                title: 'Массовое добавление сайтов',
                html: markup.join(''),
                submit: {
                    title: "Добавить"
                },
                cancel: {
                    title: "Отменить"
                },
                url: data.action,
                processData: function (data) {
                    // обработка параметров перед отправкой
                    data.sites = IHC.IDN.encode((data.badsites || "") + "\n" + (data.sites || ""));
                    return data;
                },
                extras: {
                    id: data.id
                },
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                    pages[0].init();
                },
                onError: function (data) {
                    var bad, good;
                    if (data.badList && data.goodList) {
                        bad = IHC.IDN.decode(data.badList.join('\n'));
                        good = IHC.IDN.decode(data.goodList.join('\n'));
                    }
                    if (data.error && bad) {
                        $('#'+formId+'badsites').val(bad);
                        $('.bad').show();
                        $('#'+formId+'sites').val(good);
                        if (good) {
                            $('.good').show();
                        } else {
                            $('.good').hide();
                        }
                    } else {
                        $('#'+formId+'badsites').empty();
                        $('.bad').hide();
                        $('.good').show();
                    }
                }
            });

        });

        return false;

    });


    $("input.dialog-rename").live("click", function () {

        var ele = $(this),
            props = $(this).metadata();

        $.getJSON(IHC.Provider.Links.hostingOrder.renameSite, props, function (data) {

            if (data.error) {
                renderNotice(data.error);
                return;
            }

            IHC.Dialog({
                title: "Переименовать сайт",
                form: [{
                    label: "Новое доменное имя",
                    value: IHC.IDN.decode(data.domain) || "",
                    name: "newName",
                    type: "text"
                }],
                submit: {
                    title: "Изменить"
                },
                cancel: {
                    title: "Отменить"
                },
                url: data.action,
                processData: function (data) {
                    // обработка параметров перед отправкой
                    data.newName = IHC.IDN.encode(data.newName || "");
                    return data;
                },
                extras: {
                    id: props.id || "",
                    siteId: props.siteId || ""
                },
                complete: function (data) {
                    renderNotice(data.error || data.message || "");
                }
            });
        });

        return false;

    });
});
