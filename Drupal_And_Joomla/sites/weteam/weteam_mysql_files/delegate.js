$(function () {

    function renderNotice(msg) {
        $("#form-notice").remove();
        $("#page").prepend('<div id="form-notice"><p>' + msg + '</p></div>');
    }

    function updateDelegates(delegates, context) {
        var out = "";
        $.each(delegates, function (key, value) {
            out += '<li class="order-delegates__item';
            if (key+1 == delegates.length) {
                out += ' order-delegates__item_final';
            }
            out += '">' + value + ' <span class="order-delegates__del"/></li>';
        });
        $(".order-delegates__list", context).html(out);
        if (out)
            $(".order-delegates").removeClass("order-delegates_empty");
        else
            $(".order-delegates").addClass("order-delegates_empty");
    }

    $(".order-delegator__add").bind("click", function () {

        var block = $(this).parents(".order-delegator").first(),
            order = block.metadata().order;

        IHC.Dialog({
            title: "Дать доступ другому клиенту",
            form: [{
                label: "E-mail",
                name: "email",
                value: ""
            }],
            submit: {
                title: "Дать"
            },
            cancel: {
                title: "Отмена"
            },
            url: IHC.Provider.Links.order.delegate + "/" + order,
            complete: function (data) {
                updateDelegates(data.delegates, block);
                renderNotice(data.error || data.message);
            }
        });

        return false;
    });

    $(".order-delegates__del").live("click", function () {

        var me = $(this),
            block = me.parents(".order-delegator").first(),
            order = block.metadata().order,
            email = me.parents(".order-delegates__item").first().text().trim();

        IHC.Dialog({
            form: ["Удалить доступ пользователю <b>" + email + "</b>?"],
            submit: {
                title: "Да"
            },
            cancel: {
                title: "Нет"
            },
            url: IHC.Provider.Links.order.undelegate+ "/" + order,
            extras: {
                email: email
            },
            complete: function (data) {
                updateDelegates(data.delegates, block);
                renderNotice(data.error || data.message);
            }
        });

        return false;
    });

});