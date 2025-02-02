IHC.HostingPassword = function (model) {
    $(function () {
        $('#hostingorrder form').bind('submit', function () {
            if ($(this).data("submitedBy") === "next") {
                if (!$('.hasValidator', this).eq(0).validator('checkForm', this)) {
                    alert(IHC.Provider.Messages.formValidationDefault);
                    return false;
                }
            }
        }).find("input:submit").click(function () {
            $(this).parents("form").eq(0).data("submitedBy", this.name);
        });

        $('div:has(> input#pass1)').validator({'constraints': model.pass1});
        $('div:has(> input#pass2)').validator({'constraints': $.extend({'validator': function (v) {
                return v === $('input#pass1').val();
            }}, model.pass2)});
    });
};


IHC.HostingOrder = (function () {

    var M = IHC.Provider.Messages.hostingOrder;

    function highlightRow(row) {
        var spin;
        $(row).ajaxComplete(function () {
            spin.fadeOut(function () {
                spin.remove();
            });
        });
        spin = $('<div class="ajax-spin" style="margin-left: -32px;"></div>').prependTo($('td:first > div', row));
    }

    function renderErrors(data, ele) {
        var root, holder;

        if ((data.errors && data.errors.length) || (data.messages && data.messages.length)) {

            if ($("#form-notice-wrap, #form-notice-wrap div.errors-holder, #form-notice-wrap div.messages-holder").length !== 3) {
                $("#form-notice, #form-notice-wrap").remove();
                $(ele).closest("dl").before('<div id="form-notice-wrap">' +
                    '<div id="form-notice" style="display: none;">' +
                        '<div class="errors-holder"></div>' +
                        '<div class="messages-holder"></div>' +
                    '</div>' +
                '</div>');
            }

            root = $('#form-notice');

            holder = $("div.errors-holder", root).empty();
            $.each(data.errors || [], function () {
                holder.append("<p>" + this + "</p>");
            });
            holder = $("div.messages-holder", root).empty();
            $.each(data.messages || [], function () {
                holder.append("<p>" + this + "</p>");
            });

            timer.start();
            root.slideDown('fast');
        }
    }

    function renderLimitInfo(data) {
        return '<span class="recount-stat">' +
            M.quotesSize.sprintf(
                data.statistics.totalSize,
                data.statistics.limitSize,
                data.statistics.extraSize > 0 ? M.quotesSizeOverhead.sprintf(data.statistics.extraSize) : ''
            ) +
            '&nbsp;<span class="btn recount"><span><input type="button" value="Пересчитать" /></span></span>' +
            '</span>';
    }

    function setPosition(ele) {
        var top, wrap = $("#form-notice-wrap");
        if (!wrap.length) {
            $("#form-notice").remove();
        } else {
            top = $(ele).offset().top;
            wrap.css("top", 0).css("top", top - wrap.offset().top);
        }
    }

    function resetPosition() {
        $("#form-notice-wrap").css("top", "");
    }

    function blockForm(root) {
        $("input:button", root).attr("disabled", true);
    }

    var timer = (function () {
        var id = 0;
        return {
            start: function () {
                if (id) {
                    clearTimeout(id);
                }
                id = setTimeout(function () {
                    $('#form-notice').slideUp('fast');
                }, 3000);
            }
        };
    })();


    return {
        /**
         * Сайты хостинга
         * @param root
         * @param id
         */
        Sites: function (root, id) {

            var me = this;

            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var M = IHC.Provider.Messages.hostingOrder,
                    out = [];

                renderErrors(data, root);

                if (!data.sites) {
                    return;
                }

                out.push('<table class="list">');

                out.push('<tr class="head"><td colspan="5"><div>Добавить сайт <span>(<a href="#" class="dialog-addsites {id: ' + id + '}">нажмите здесь для добавления нескольких сайтов</a>)</span></div></td></tr>');

                out.push('<tr class="new-record even">',
                    '<td class="name first"><div>',
                    '<strong>www.</strong><input type="text" />',
                    '</div></td>',
                    '<td colspan="4" class="last"><div>',
                    '<span class="btn"><span><input type="button" value="' + M.addButton + '" class="add" /></span></span>',
                    '</div></td>',
                    '</tr>');

                if (data.sites.length > 0) {
                    out.push('<tr class="head"><td colspan="4"><div>Добавить поддомен для существующего сайта</div></td></tr>');
                    out.push('<tr class="new-record even">',
                        '<td class="name first"><div>',
                        '<input type="text" class="sub" /> . <select class="base">');
                    $.each(data.sites, function () {
                        out.push('<option>' + IHC.IDN.decode(this.name) + '</option>');
                    });
                    out.push(       '</select>',
                        '</div></td>',
                        '<td colspan="4" class="last"><div>',
                        '<span class="btn"><span><input type="button" value="' + M.addButton + '" class="add-sub" /></span></span>',
                        '</div></td>',
                        '</tr>');
                }

                out.push('</table><br>');

                out.push('<table class="list">');

                out.push('<thead><tr>',
                            '<th class="name first"><div>' + M.site + '</div></th>',
                            (data.ifOrderOwner == true ? '<th><div>' + M.dns + '</div></th>' :''),
                            '<th><div>Алиасы</div></th>',
                            '<th><div>Объем</div></th>',
                            '<th class="last"><div>&nbsp;</div></th>',
                        '</tr></thead>');

                out.push('<tbody>');

                $.each(data.sites, function () {
                    var r = this;

                    out.push('<tr class="site site' + r.id + '">');

                    out.push('<td class="name first"><div><p>',
                                (r.link ? '<a target="_blank" href="' + r.link + '/">' : ''), IHC.IDN.decode(r.name), (r.link ? '</a> (<a target="_blank" href="' + r.link + '.' + data.preview + '/">предпросмотр</a>)' : ''),
                                '</p> <span>/home/p' + id + '/www/' + r.name + '/</span>',
                            '</div></td>',
                            (data.ifOrderOwner == true ? '<td class="dns"><div>' + (r.manageLink ? '<a href="' + r.manageLink + '">' + M.update + '</a>' : '&mdash;') + '</div></td>' : ''),
                            '<td><div><a href="#" class="dialog-aliases {id: ' + id + ', siteId: ' + r.id + '}">' + (r.aliases ? 'Редактировать' : 'Создать') + '</a></div></td>',
                            '<td><div>',
                                data.statistics.collectingInProgress ? "&nbsp;" : "%.2f МБ".sprintf(r.statistics.totalSize),
                            '</div></td>',
                            '<td class="last"><div>',
                                (r.link ? '<span class="btn" id="' + IHC.savepoint(r) + '"><span><input type="button" value="Удалить сайт и файлы" class="delete" /></span></span>' : '&nbsp;'),
                                (r.link ? '<span class="btn" id="' + IHC.savepoint(r) + '"><span><input type="button" value="Переименовать" class="dialog-rename {id: ' + id + ', siteId: ' + r.id + '}" /></span></span>' : '&nbsp;'),
                            '</div></td>'
                    );

                    out.push('</tr>');
                });

                if (data.banned && data.banned.length) {
                    $.each(data.banned, function () {
                        var r = this;
                        out.push('<tr class="site site' + r.id + '">');
                        out.push('<td class="name first last" colspan="5"><div>',
                                    r.name + " &larr; <strong>" + M.banned + "</strong>",
                                '</div></td>');
                        out.push('</tr>');
                    });
                }

                out.push('</tbody></table>');

                out.push('<p style="margin-top: 1em;">',
                        (data.statistics.extraCount ?
                                M.quotesCountExtra.sprintf(data.statistics.totalCount, data.statistics.limitCount, data.statistics.extraCount) :
                                M.quotesCount.sprintf(data.statistics.totalCount, data.statistics.limitCount))
                        );
                if (!data.statistics.collectingInProgress) {
                    out.push(renderLimitInfo(data));
                }

                out.push('<span style="padding-left: 2em;" class="recount-msg ' + (data.statistics.collectingInProgress ? '' : 'hidden') + '">Занимаемый объем пересчитывается&hellip;</span>');

                out.push('</p>');

                $(root).html(out.join('')).find("tbody > tr:even").addClass("even");

                if (data.statistics.totalSize > data.statistics.limitSize + data.statistics.extraSize) {
                    $("span.quotes-size", root).addClass("almost-exhausted");
                }

                $(".btn.recount", root).bind("click", function () {
                    $(".recount-stat", root).addClass("hidden");
                    $(".recount-msg", root).removeClass("hidden");
                    $.ajax({
                        url: IHC.Provider.Links.hostingOrder.collectMetrics,
                        data: {id: id}
                    });
                });

                if ($(root).closest("dl").hasClass("order-in-test")) {
                    if (data.statistics.totalCount >= data.statistics.limitCount) {
                        $("tr.new-record", root).prev("tr").andSelf().addClass("hidden");
                    }
                }

                function getRecordId(ele) {
                    var str = ele.get(0).className;
                    var parts = str.match(/site(\d+)/);
                    return parseInt(parts[1], 10);
                }

                $("input.add", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'name': IHC.IDN.encode($('.name input', row).val())
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.addSite, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.add-sub", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'name': IHC.IDN.encode($('.name input.sub', row).val() + "." + $('.name select.base', row).val())
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.addSite, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.delete", root).bind("click", function () {
                    var siteObj = IHC.recall($(this).closest(".btn").attr("id")),
                        name = siteObj ? siteObj.name : "";

                    if (this.disabled || !confirm("Вы действительно хотите удалить сайт " + IHC.IDN.decode(name).toUpperCase() + " и ВСЕ ФАЙЛЫ из директории www/" + name.toLowerCase() + "?")) return;

                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'siteId': getRecordId(row)
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.deleteSite, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                /** нажать Enter в текстовом поле == нажать кнопку Add / Edit **/
                $("input:text", root).bind("keypress", function (e) {
                    if (e.which == 13) {
                        $(this).parents("tr").find("td:last input:button:first").trigger("click");
                    }
                });

            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.sites, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };

        },

        /**
         * Базы данных хостинга
         * @param root
         * @param id
         */
        Database: function (root, id) {

            var me = this;

            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var M = IHC.Provider.Messages.hostingOrder,
                    out = [];

                renderErrors(data, root);

                if (!data.databases) {
                    return;
                }

                out.push('<table class="list">');
                out.push('<tr class="head"><td><div>',
                    'Добавить базу MySQL',
                    '</div></td>',
                    '<td colspan="3" style="text-align: right;"><div>',
                    'MySQL сервер: <strong>p' + id + '.' + data.mysql + '</strong> (используйте вместо <strong>localhost</strong>)',
                    '</div></td>',
                    '</tr>');

                out.push('<tr class="new-record even">',
                    '<td class="db-suffix first"><div>',
                    '<p>Имя базы и имя пользователя:</p>',
                    '<strong>p' + id + '_</strong><input type="text" />',
                    '</div></td>',
                    '<td class="db-password"><div>',
                    '<table><tr><td style="padding-right: 0.5em;">',
                    '<p>Пароль:</p>',
                    '<input type="password" />',
                    '</td><td>',
                    '<p>Повторите пароль:</p>',
                    '<input type="password" />',
                    '</td></tr></table>',
                    '</div></td>',
                    '<td class="last" colspan="2" style="vertical-align: bottom;"><div style="padding-bottom: 0;">',
                    '<span class="btn"><span><input type="button" value="Добавить" class="add" /></span></span>',
                    '</div></td>',
                    '</tr>');
                out.push('</table><br>')

                out.push('<table class="list">');

                out.push('<thead><tr>',
                            '<th class="db-name first"><div>База</div></th>',
                            '<th class="db-user"><div>Пользователь</div></th>',
                            '<th><div>Объем</div></th>',
                            '<th class="last"><div>&nbsp;</div></th>',
                        '</tr></thead>');

                out.push('<tbody>');

                $.each(data.databases, function () {
                    var r = this;

                    out.push('<tr class="db db' + r.id + '">');

                    out.push('<td class="db-name first"><div>',
                                r.name,
                                (r.manageLink ? ' <span class="link" id="' + IHC.savepoint(r) + '">MyAdmin</span>' : ''),
                            '</div></td>',
                            '<td class="db-user"><div>',
                                r.user,
                                (r.manageLink ? ' <a href="' + r.manageLink + '" class="dialog-dbpass">Сменить пароль</a>' : ''),
                            '</div></td>',
                            '<td><div>',
                                data.statistics.collectingInProgress ? "&nbsp;" : "%.2f МБ".sprintf(r.statistics.totalSize),
                            '</div></td>',
                            '<td class="last"><div>',
                                (r.manageLink ? '<span class="btn"><span><input type="button" value="Удалить" class="delete" /></span></span>' : '&nbsp;'),
                            '</div></td>');

                    out.push('</tr>');
                });

                if (data.banned && data.banned.length) {
                    $.each(data.banned, function () {
                        var r = this;
                        out.push('<tr class="db db' + r.id + '">');
                        out.push('<td class="name first last" colspan="4"><div>',
                                    r.name + " &larr; <strong>" + M.banned + "</strong>",
                                '</div></td>');
                        out.push('</tr>');
                    });
                }



                out.push('</tbody></table>');

                out.push('<p style="margin-top: 1em;">',
                        (data.statistics.extraCount ?
                                M.quotesCountExtra.sprintf(data.statistics.totalCount, data.statistics.limitCount, data.statistics.extraCount) :
                                M.quotesCount.sprintf(data.statistics.totalCount, data.statistics.limitCount))
                        );
                if (!data.statistics.collectingInProgress) {
                    out.push(renderLimitInfo(data));
                }

                out.push('<span style="padding-left: 2em;" class="recount-msg ' + (data.statistics.collectingInProgress ? '' : 'hidden') + '">Занимаемый объем пересчитывается&hellip;</span>');

                out.push('</p>');

                $(root).html(out.join('')).find("tbody > tr:even").addClass("even");

                if (data.statistics.totalSize > data.statistics.limitSize + data.statistics.extraSize) {
                    $("span.quotes-size", root).addClass("almost-exhausted");
                }

                $(".btn.recount", root).bind("click", function () {
                    $(".recount-stat", root).addClass("hidden");
                    $(".recount-msg", root).removeClass("hidden");
                    $.ajax({
                        url: IHC.Provider.Links.hostingOrder.collectMetrics,
                        data: {id: id}
                    });
                });

                $('tr.db span.link', root).bind("click", function() {
                    var db = IHC.recall(this.id);

                    $("#phpmyadmin").remove();
                    $(root).append('<form id="phpmyadmin" target="_blank" method="post" action="http://' + db.name.replace(/_/g, "-") + '.' + data.myAdmin + '/index.php">' +
                                '<input type="hidden" name="pma_username" value="' + IHC.htmlspecialchars(db.user) + '" />' +
                                '<input type="hidden" name="pma_password" value="' + IHC.htmlspecialchars(db.pass) + '" />' +
                                '<input type="hidden" name="db" value="' + IHC.htmlspecialchars(db.name) + '" />' +
                                '<input type="hidden" name="server" value="1" />' +
                            '</form>');

                    $("#phpmyadmin").each(function () {
                        var form = $(this).submit();
                        setTimeout(function () {
                            form.remove();
                        }, 500);
                    });
                });

                if ($(root).closest("dl").hasClass("order-in-test")) {
                    if (data.statistics.totalCount >= data.statistics.limitCount) {
                        $("tr.new-record", root).prev("tr").andSelf().addClass("hidden");
                    }
                }

                function getRecordId(ele) {
                    var str = ele.get(0).className;
                    var parts = str.match(/db(\d+)/);
                    return parseInt(parts[1], 10);
                }

                $("input.add", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var fields = $('.db-password input', row);

                    if (fields.eq(0).val() != fields.eq(1).val()) {
                        setPosition(row);
                        renderErrors({errors: ["Пароли не совпадают"]}, root);
                        return;
                    }

                    var props = {
                        'id': id,
                        'suffix': $('.db-suffix input', row).val(),
                        'pass': $('.db-password input:first', row).val()
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.addDatabase, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.delete", root).bind("click", function () {
                    if (this.disabled || !confirm("Вы действительно хотите удалить эту базу данных?")) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'dbId': getRecordId(row)
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.deleteDatabase, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                /** нажать Enter в текстовом поле == нажать кнопку Add / Edit **/
                $("input:text", root).bind("keypress", function (e) {
                    if (e.which == 13) {
                        $(this).parents("tr").find("td:last input:button:first").trigger("click");
                    }
                });

            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.databases, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };
        },


        /**
         * Почтовые ящики хостинга
         * @param root
         * @param id
         */
        MailBoxes: function (root, id) {

            var me = this;

            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var M = IHC.Provider.Messages.hostingOrder,
                    out = [];

                renderErrors(data, root);

                if (!data.mailboxes || !data.domains) {
                    return;
                }
                out.push('<div style="padding-top: 1em;">');
                if (data.domains.length) {
                    out.push('<span class="btn"><span><input type="button" value="Добавить почтовый ящик" class="add" /></span></span>');
                } else {
                    out.push('Нет доменов для почтовых ящиков');
                }

                out.push('<table class="list">');

                out.push('<thead><tr>',
                            '<th class="mb-catchall first"><div>Catch-all *</div></th>',
                            '<th class="mb-account"><div>Почтовый ящик</div></th>',
                            '<th class="mb-pass"><div>Редактировать</div></th>',
                            '<th><div>Объем</div></th>',
                            '<th class="last"><div>&nbsp;</div></th>',
                        '</tr></thead>');

                out.push('<tbody>');

                var lastDomain;

                $.each(data.mailboxes, function () {
                    var r = this;

                    out.push('<tr class="mb mb' + r.id + (lastDomain && lastDomain !== r.domain ? ' firstbox' : '') + '">');

                    lastDomain = r.domain;

                    out.push('<td class="mb-catchall first"><div>',
                                '<input type="checkbox" ' + (r.catchall ? 'checked="checked"' : '') + ' ' + (r.busy ? 'disabled="disabled"' : '') + ' />',
                            '</div></td>',
                            '<td class="mb-account"><div>',
                                r.name + "@" + IHC.IDN.decode(r.domain),
                                (r.manageLink ? ' <span class="link" id="' + IHC.savepoint(r) + '">WebMail</span>' : ''),
                            '</div></td>',
                            '<td class="mb-pass"><div>',
                                (r.manageLink ? '<a href="#" class="dialog-mailpass {id:' + id + ',mailId:' + r.id + '}">Редактировать</a>' : '&nbsp;'),
                            '</div></td>',
                            '<td><div>',
                                data.statistics.collectingInProgress ? "&nbsp;" : "%.2f МБ".sprintf(r.statistics.totalSize),
                            '</div></td>',
                            '<td class="last"><div>',
                                (r.manageLink ? '<span class="btn"><span><input type="button" value="Удалить" class="delete" /></span></span>' : '&nbsp;'),
                            '</div></td>');

                    out.push('</tr>');
                });

                out.push('</tbody></table>* Почта для несуществующих адресов будет попадать в этот ящик.');


                out.push('</div>');

                out.push('<p style="margin-top: 1em;">',
                        (data.statistics.extraCount ?
                                M.quotesCountExtra.sprintf(data.statistics.totalCount, data.statistics.limitCount, data.statistics.extraCount) :
                                M.quotesCount.sprintf(data.statistics.totalCount, data.statistics.limitCount))
                        );
                if (!data.statistics.collectingInProgress) {
                    out.push(renderLimitInfo(data));
                }

                out.push('<span style="padding-left: 2em;" class="recount-msg ' + (data.statistics.collectingInProgress ? '' : 'hidden') + '">Занимаемый объем пересчитывается&hellip;</span>');

                out.push('</p>');

                $(root).html(out.join('')).find("tbody > tr:even").addClass("even");

                if (data.statistics.totalSize > data.statistics.limitSize + data.statistics.extraSize) {
                    $("span.quotes-size", root).addClass("almost-exhausted");
                }

                $(".btn.recount", root).bind("click", function () {
                    $(".recount-stat", root).addClass("hidden");
                    $(".recount-msg", root).removeClass("hidden");
                    $.ajax({
                        url: IHC.Provider.Links.hostingOrder.collectMetrics,
                        data: {id: id}
                    });
                });

                $('tr.mb span.link', root).bind("click", function() {
                    var mb = IHC.recall(this.id);

                    $("#webmail").remove();
                    $(root).append('<form id="webmail" target="_blank" method="post" action="http://' + data.webMail + '/">' +
                                '<input type="hidden" name="_task" value="login" />' +
                                '<input type="hidden" name="_action" value="login" />' +
                                '<input type="hidden" name="_timezone" value="_default_" />' +
                                '<input type="hidden" name="_url" value="" />' +
                                '<input type="hidden" name="_user" value="' + IHC.htmlspecialchars(mb.name) + "@" + mb.domain + '" />' +
                                '<input type="hidden" name="_pass" value="' + IHC.htmlspecialchars(mb.pass) + '" />' +
                                '<input type="hidden" name="_host" value="p' + id + '.' + data.mail + '" />' +
                            '</form>');

                    $("#webmail").each(function () {
                        var form = $(this).submit();
                        setTimeout(function () {
                            form.remove();
                        }, 500);
                    });
                });

                if ($(root).closest("dl").hasClass("order-in-test")) {
                    if (data.statistics.totalCount >= data.statistics.limitCount) {
                        $("tr.new-record", root).prev("tr").andSelf().addClass("hidden");
                    }
                }

                function getRecordId(ele) {
                    var str = ele.get(0).className;
                    var parts = str.match(/mb(\d+)/);
                    return parseInt(parts[1], 10);
                }

                $("tr.mb .mb-catchall input:checkbox", root).bind("change click", function () {
                    var cur = $(this).closest("tr.mb"), rows;

                    while (!cur.hasClass("firstbox") && cur.prev().length) {
                        cur = cur.prev();
                    }

                    rows = cur.nextUntil("tr.firstbox").andSelf().filter(".mb");
                    rows.find("input:checkbox").attr("disabled", "disabled")
                        .not(this).removeAttr("checked");

                    (function (row) {
                        if (row.hasClass("progress")) {
                            return;
                        }
                        row.addClass("progress");

                        highlightRow(row);

                        IHC.postJSON(IHC.Provider.Links.hostingOrder.catchAllMailBox,
                            {id: id, mailId: getRecordId(row), state: row.find("input:checkbox").get(0).checked},
                            function (data) {
                                row.removeClass("progress");
                                setPosition(row);
                                renderErrors({messages: [data.message || data.error || ""]}, root);
                            });
                    }($(this).closest("tr.mb")));
                });

                $("input.add", root).bind("click", function () {
                    IHC.HostingMail({
                        id: id,
                        callback: function () {
                            me.init();
                        }
                    });
                });

                $("input.delete", root).bind("click", function () {
                    if (this.disabled || !confirm("Вы действительно хотите удалить этот почтовый ящик?")) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'mailId': getRecordId(row)
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.deleteMailBox, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                /** нажать Enter в текстовом поле == нажать кнопку Add / Edit **/
                $("input:text", root).bind("keypress", function (e) {
                    if (e.which == 13) {
                        $(this).parents("tr").find("td:last input:button:first").trigger("click");
                    }
                });

            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.mailboxes, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };
        },


        /**
         * Дополнительные FTP аккаунты
         * @param root
         * @param id
         */
        FtpAccounts: function (root, id) {

            var me = this;

            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var M = IHC.Provider.Messages.hostingOrder,
                    out = [];

                renderErrors(data, root);

                if (!data.ftpaccounts) {
                    return;
                }

                out.push('<table class="list">');

                out.push('<tr class="head"><td colspan="4"><div>Добавить дополнительный FTP аккаунт</div></td></tr>');

                out.push('<tr class="new-record even">',
                    '<td class="ftpaccount-name first"><div>',
                    '<p>Логин:</p>',
                    '<strong>p' + id + '_</strong><input style="width: 4em;" type="text" />',
                    '</div></td>',
                    '<td class="ftpaccount-pass"><div>',
                    '<table><tr><td style="padding-right: 0.5em;">',
                    '<p>Пароль:</p>',
                    '<input type="password" />',
                    '</td><td>',
                    '<p>Повторите пароль:</p>',
                    '<input type="password" />',
                    '</td></tr></table>',
                    '</div></td>',
                    '<td class="ftpaccount-dir"><div>',
                    '<p>Домашняя директория</p>',
                    '<strong>/home/p' + id + '/</strong><input type="text" />',
                    '</div></td>',
                    '<td class="last" style="vertical-align: bottom;"><div style="padding-bottom: 0;">',
                    '<span class="btn"><span><input type="button" value="Добавить" class="add" /></span></span>',
                    '</div></td>',
                    '</tr>');

                out.push('</table><br>');

                out.push('<table class="list">');

                out.push('<thead><tr>',
                            '<th class="ftpaccount-name first"><div>Логин</div></th>',
                            '<th class="ftpaccount-pass"><div>Пароль</div></th>',
                            '<th class="ftpaccount-dir"><div>Директория</div></th>',
                            '<th class="last"><div>&nbsp;</div></th>',
                        '</tr></thead>');

                out.push('<tbody>');

                $.each(data.ftpaccounts, function () {
                    var r = this;

                    out.push('<tr class="ftpaccount ftpaccount' + r.id + '">');

                    out.push('<td class="ftpaccount-name first"><div>',
                                'p' + id + "_" + r.name,
                            '</div></td>',
                            '<td class="ftpaccount-pass"><div>',
                                // r.password,
                                (r.passLink ? ' <a href="' + r.passLink + '" class="dialog-ftppass">Cменить пароль</a>' : '&nbsp;'),
                            '</div></td>',
                            '<td class="ftpaccount-dir"><div>',
                                '/home/p' + id + "/" + r.dir + "/",
                                (r.dirLink ? ' <a href="' + r.dirLink + '" class="dialog-ftpdir">Изменить</a>' : ''),
                            '</div></td>',
                            '<td class="last"><div>',
                                (r.passLink && r.dirLink ? '<span class="btn"><span><input type="button" value="Удалить" class="delete" /></span></span>' : '&nbsp;'),
                            '</div></td>');

                    out.push('</tr>');
                });



                out.push('</tbody></table>');

                out.push('<p style="margin-top: 1em;">',
                        (data.statistics.extraCount ?
                                M.quotesCountExtra.sprintf(data.statistics.totalCount, data.statistics.limitCount, data.statistics.extraCount) :
                                M.quotesCount.sprintf(data.statistics.totalCount, data.statistics.limitCount)),
                        '</p>');

                $(root).html(out.join('')).find("tbody > tr:even").addClass("even");

                if ($(root).closest("dl").hasClass("order-in-test")) {
                    if (data.statistics.totalCount >= data.statistics.limitCount) {
                        $("tr.new-record", root).prev("tr").andSelf().addClass("hidden");
                    }
                }

                function getRecordId(ele) {
                    var str = ele.get(0).className;
                    var parts = str.match(/ftpaccount(\d+)/);
                    return parseInt(parts[1], 10);
                }

                $("input.add", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var fields = $('.ftpaccount-pass input', row);

                    if (fields.eq(0).val() != fields.eq(1).val()) {
                        setPosition(row);
                        renderErrors({errors: ["Пароли не совпадают"]}, root);
                        return;
                    }

                    var props = {
                        'id': id,
                        'name': $('.ftpaccount-name input', row).val(),
                        'pass': $('.ftpaccount-pass input:first', row).val(),
                        'dir': $('.ftpaccount-dir input', row).val()
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.addFtpAccount, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.delete", root).bind("click", function () {
                    if (this.disabled || !confirm("Вы действительно хотите удалить этот аккаунт?")) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'ftpId': getRecordId(row)
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.deleteFtpAccount, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                /** нажать Enter в текстовом поле == нажать кнопку Add / Edit **/
                $("input:text", root).bind("keypress", function (e) {
                    if (e.which == 13) {
                        $(this).parents("tr").find("td:last input:button:first").trigger("click");
                    }
                });

            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.ftpaccounts, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };
        },



        /**
         * Поддомены хостинга
         * @param root
         * @param id
         */
        SubDomains: function (root, id) {

            var me = this;

            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var M = IHC.Provider.Messages.hostingOrder,
                    out = [];

                renderErrors(data, root);

                if (!data.subdomains || !data.domains) {
                    return;
                }

                out.push('<table class="list">');

                if (data.domains.length) {

                    out.push('<tr class="head"><td colspan="2"><div>Добавить поддомен</div></td></tr>');

                    out.push('<tr class="new-record even">',
                        '<td class="subdomain-name first"><div>',
                        '<input type="text" />&nbsp;.&nbsp;<select>');
                    $.each(data.domains, function () {
                        out.push('<option value="' + this.id + '">' + this.domain + '</options>');
                    });
                    out.push(       '</select>',
                        '</div></td>',
                        '<td class="last"><div>',
                        '<span class="btn"><span><input type="button" value="Добавить" class="add" /></span></span>',
                        '</div></td>',
                        '</tr>');
                } else {
                    out.push('<tr class="head"><td colspan="2"><div>Нет доменов для создания поддоменов</div></td></tr>');
                }

                out.push('</table><br>');



                out.push('<table class="list">');

                out.push('<thead><tr>',
                            '<th class="subdomain-name first"><div>Домен</div></th>',
                            '<th class="last"><div>&nbsp;</div></th>',
                        '</tr></thead>');

                out.push('<tbody>');

                $.each(data.subdomains, function () {
                    var r = this;

                    out.push('<tr class="subdomain subdomain' + r.id + '">');

                    out.push('<td class="subdomain-name first"><div>',
                                r.name + "." + r.domain,
                            '</div></td>',
                            '<td class="last"><div>',
                                '<span class="btn"><span><input type="button" value="Удалить" class="delete" /></span></span>',
                            '</div></td>');

                    out.push('</tr>');
                });


                out.push('</tbody></table>');

                out.push('<p style="margin-top: 1em;">',
                        (data.statistics.extraCount ?
                                M.quotesCountExtra.sprintf(data.statistics.totalCount, data.statistics.limitCount, data.statistics.extraCount) :
                                M.quotesCount.sprintf(data.statistics.totalCount, data.statistics.limitCount))
                        );
                if (!data.statistics.collectingInProgress) {
                    out.push(renderLimitInfo(data));
                }

                out.push('<span style="padding-left: 2em;" class="recount-msg ' + (data.statistics.collectingInProgress ? '' : 'hidden') + '">Занимаемый объем пересчитывается&hellip;</span>');

                out.push('</p>');

                $(root).html(out.join('')).find("tbody > tr:even").addClass("even");

                if (data.statistics.totalSize > data.statistics.limitSize + data.statistics.extraSize) {
                    $("span.quotes-size", root).addClass("almost-exhausted");
                }

                $(".btn.recount", root).bind("click", function () {
                    $(".recount-stat", root).addClass("hidden");
                    $(".recount-msg", root).removeClass("hidden");
                    $.ajax({
                        url: IHC.Provider.Links.hostingOrder.collectMetrics,
                        data: {id: id}
                    });
                });

                if ($(root).closest("dl").hasClass("order-in-test")) {
                    if (data.statistics.totalCount >= data.statistics.limitCount) {
                        $("tr.new-record", root).prev("tr").andSelf().addClass("hidden");
                    }
                }

                function getRecordId(ele) {
                    var str = ele.get(0).className;
                    var parts = str.match(/subdomain(\d+)/);
                    return parseInt(parts[1], 10);
                }

                $("input.add", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'name': $('.subdomain-name input', row).val(),
                        'domain': $('.subdomain-name select', row).val()
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.addSubDomain, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.delete", root).bind("click", function () {
                    if (this.disabled || !confirm("Вы действительно хотите удалить этот поддомен?")) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'subId': getRecordId(row)
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.deleteSubDomain, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                /** нажать Enter в текстовом поле == нажать кнопку Add / Edit **/
                $("input:text", root).bind("keypress", function (e) {
                    if (e.which == 13) {
                        $(this).parents("tr").find("td:last input:button:first").trigger("click");
                    }
                });

            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.subdomains, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };
        },




        /**
         * Выполнение по расписанию
         * @param root
         * @param id
         */
        Cron: function (root, id) {

            var me = this;

            var PERIODS = {
                "@yearly": "Раз в год",
                "@monthly": "Раз в месяц",
                "@weekly": "Раз в неделю",
                "@daily": "Раз в день",
                "@hourly": "Раз в час",
                "*/5 * * * *": "Раз в 5 минут"
            };

            function getPeriodAsText(period) {
                return PERIODS[period] ? PERIODS[period] : period;
            }

            function getPeriodWidget(period) {
                var s = [], shortcut = false;

                s.push('<select style="width: 12em;">');
                s.push('<option value="">Произвольный</option>');
                $.each(PERIODS, function (k, v) {
                    s.push('<option value="' + k + '" ');
                    if (k === period) {
                        shortcut = true;
                        s.push('selected="selected" ');
                    }
                    s.push('>' + v + '</option>');
                });
                s.push('</select>');

                s.push('&nbsp;<input style="width: 12em;" type="text" value="' + IHC.htmlspecialchars(shortcut ? "" : period) + '" class="' + (shortcut ? "hidden" : "") + '" />');

                return s.join('');
            }


            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var M = IHC.Provider.Messages.hostingOrder,
                    out = [];

                renderErrors(data, root);

                if (!data.cronjobs) {
                    return;
                }

                out.push('<table class="list">');

                out.push('<tr class="head"><td colspan="4"><div>Добавить задание</div></td></tr>');

                out.push('<tr class="new-record even">',
                    '<td class="period first"><div style="white-space: nowrap;">',
                    getPeriodWidget("@hourly"),
                    '<br /><a href="' + data.support + '/index.php?_m=knowledgebase&_a=viewarticle&kbarticleid=150&nav=0,6" target="_blank">Как писать правила времени выполнения</a>',
                    '</div></td>',
                    '<td class="command"><div>',
                    '<input type="text" value="" style="width: 90%;" /><br />Например: <b>/usr/bin/php /home/pNNNN/www/site.tld/path/script.php</b>',
                    '</div></td>',
                    '<td class="report"><div style="text-align: center;">',
                    '<input type="checkbox" />',
                    '</div></td>',
                    '<td class="last"><div>',
                    '<span class="btn"><span><input type="button" value="' + M.addButton + '" class="add" /></span></span>',
                    '</div></td>',
                    '</tr>');

                out.push('</table><br>');

                out.push('<table class="list">');

                out.push('<thead><tr>',
                            '<th class="first" style="width: 26em;"><div>Периодичность</div></th>',
                            '<th style="width: 50%;"><div>Команда</div></th>',
                            '<th><div>Отчёт на E-mail</div></th>',
                            '<th class="last"><div>&nbsp;</div></th>',
                        '</tr></thead>');

                out.push('<tbody>');

                $.each(data.cronjobs, function () {
                    var r = this;

                    out.push('<tr class="cronjob cronjob' + r.id + '">');

                    out.push('<td class="period first"><div>',
                                getPeriodWidget(r.period),
                            '</div></td>',
                            '<td class="command"><div>',
                                '<input type="text" value="' + IHC.htmlspecialchars(r.command) + '" style="width: 90%;" />',
                            '</div></td>',
                            '<td class="report"><div style="text-align: center;">',
                                '<input type="checkbox" ' + (r.report ? 'checked="checked"' : '') + ' />',
                            '</div></td>',
                            '<td class="last"><div>',
                                (r.notBusy ? '<span class="btn"><span><input type="button" value="Изменить" class="update" /></span></span>' : '&nbsp;'),
                                (r.notBusy ? '<span class="btn"><span><input type="button" value="' + M.deleteButton + '" class="delete" /></span></span>' : '&nbsp;'),
                            '</div></td>');

                    out.push('</tr>');
                });




                out.push('</tbody></table>');

                $(root).html(out.join('')).find("tbody > tr:even").addClass("even");

                $("tr select", root).bind("change", function () {
                    $(this).siblings("input")[$(this).val() ? "addClass" : "removeClass"]("hidden");
                });

                function getRecordId(ele) {
                    var str = ele.get(0).className;
                    var parts = str.match(/cronjob(\d+)/);
                    return parseInt(parts[1], 10);
                }

                $("input.add", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'period': (function () {
                            var sel = $('.period select', row).val(),
                                text = $('.period input', row).val();
                            return sel ? sel : text
                        }()),
                        'command': $('.command input', row).val(),
                        'report': $('.report input:checked', row).length > 0
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.addCronjob, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.update", root).bind("click", function () {
                    if (this.disabled) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'cronId': getRecordId(row),
                        'period': (function () {
                            var sel = $('.period select', row).val(),
                                text = $('.period input', row).val();
                            return sel ? sel : text
                        }()),
                        'command': $('.command input', row).val(),
                        'report': $('.report input:checked', row).length > 0
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.updateCronjob, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                $("input.delete", root).bind("click", function () {
                    if (this.disabled || !confirm("Вы действительно хотите удалить это задание?")) return;
                    var row = $(this).parents('tr').eq(0);
                    var props = {
                        'id': id,
                        'cronId': getRecordId(row)
                    };
                    highlightRow(row);
                    $.post(IHC.Provider.Links.hostingOrder.deleteCronjob, props, function (data) {
                        blockForm(root);
                        setPosition(row);
                        me.render(data);
                    }, "json");
                });

                /** нажать Enter в текстовом поле == нажать кнопку Add / Edit **/
                $("input:text", root).bind("keypress", function (e) {
                    if (e.which == 13) {
                        $(this).parents("tr").find("td:last input:button:first").trigger("click");
                    }
                });

            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.cronjobs, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };

        },


        /**
         * Статистика за месяц
         * @param root
         * @param id
         */
        Stats: function (root, id) {

            var me = this;

            me.render = function (data) {

                $("input:button", root).removeAttr("disabled");

                var out = [];

                renderErrors(data, root);

                if (!data || data.length == 0) {
                    return;
                }

                out.push('<table class="list">');

                out.push(
                    '<thead><tr>',
                    '<th class="first"><div>Дата</div></th>',
                    '<th><div>CPU</div></th>',
                    '<th class="last"><div>MySQL</div></th>',
                    '</tr></thead>'
                );

                out.push('<tbody>');

                $.each(data, function () {
                    var r = this;

                    out.push('<tr>');

                    out.push(
                        '<td class="first"><div>' + r.date + '</div></td>',
                        '<td><div>' + r.cpu + '</div></td>',
                        '<td class="last"><div>' + r.mysql + '</div></td>'
                    );

                    out.push('</tr>');
                });

                out.push('</tbody></table>');

                var tbl = $(root).html(out.join(''));
                tbl.find("tbody > tr:even").addClass("odd");
                tbl.find("tbody > tr:odd").addClass("even");
            };

            me.init = function (callback) {
                $.getJSON(IHC.Provider.Links.hostingOrder.statistics, {id: isNaN(id) ? "" : id}, function (data) {
                    resetPosition();
                    if ($.isFunction(callback)) {
                        callback.call(me, data);
                    }
                    me.render(data);
                });
            };

        }

    };

}());
