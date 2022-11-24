$('.add-drive').click(function(){
    let size      = $(this).attr('id');
    let server    = $("#server");
    let btn_class = $(server).data("class");
    let prefix    = $(server).data("prefix");
    let suffix    = $(server).data("suffix");
    $(server).append('<button type="text" readonly class="'+btn_class+'" value="'+ size +'">'+ prefix + size + suffix + '</button>');
    RaidCalculate()
});

$(document).on('click', '.this-drive', function () {
    $(this).closest('button').remove();
    RaidCalculate()
});

function RaidCalculate() {
    let el0  = $(".this-drive");
    let match = $(el0).length;
    if(match < 2) {
        $("#raid-box").addClass("d-none");
        $("#remove_msg").addClass("d-none");
        $("#add_msg").removeClass("d-none");
    } else {
        let maxdrives = $(server).data("maxdrives");
        if(match >= maxdrives) {
            $(".add-drive").prop('disabled', true);
        } else {
            $(".add-drive").prop('disabled', false);
        }
        $("#raid-box").removeClass("d-none");
        $("#remove_msg").removeClass("d-none");
        $("#add_msg").addClass("d-none");
    }

    let sum = 0;
    let i   = 0;
    let lvl = $("#raid option:selected").val();
    let showCalc = $("#showCalc");

    $(".raid-error").addClass("d-none");
    $(showCalc).removeClass("d-none");

    $(el0).each(function () {
        let size = $(this).val();
        sum += Number(size);
        i++;
    });

    let ids = $(el0).map(function() {
        return $(this).val();
    }).get();
    let lowest = Math.min.apply(Math, ids);


    let el1 = $("#storage");
    let el2 = $("#parity");
    let el3 = $("#unused");
    let m0  = match/2;
    let m1  = Math.round(m0);
    switch (lvl) {
        case '0':
            $(el1).text(sum+" TB");
            $(el2).text("0 TB");
            $(el3).text("0 TB");
            break;
        case '1':
            $(el1).text(lowest+" TB");
            let parity = lowest*(i-1);
            $(el2).text(parity+" TB");
            let unused = sum-(parity+lowest);
            $(el3).text(unused+" TB");
            break;
        case '5':
            if(match < 3) {
                $("#raid5error").removeClass("d-none");
                $(showCalc).addClass("d-none");
            } else {
                $(el2).text(lowest+" TB");
                let parity = lowest*(i-1);
                $(el1).text(parity+" TB");
                let unused = sum-(parity+lowest);
                $(el3).text(unused+" TB");
            }
            break;
        case '01':
            if(match < 4 || m0!==m1) {
                $("#raid01error").removeClass("d-none");
                $(showCalc).addClass("d-none");
            } else {
                $(el1).text((i*lowest)/2+" TB");
                $(el2).text((i*lowest)/2+" TB");
                $(el3).text(sum-(i*lowest)+" TB");
            }
            break;
        case '10':
            if(match < 4 || m0!==m1) {
                $("#raid10error").removeClass("d-none");
                $(showCalc).addClass("d-none");
            } else {
                $(el1).text((i*lowest)/2+" TB");
                $(el2).text((i*lowest)/2+" TB");
                $(el3).text(sum-(i*lowest)+" TB");
            }
            break;
    }
}

$('#raid').on('input', function(){
    RaidCalculate();
});