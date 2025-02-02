$('#fromDate').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
});
$('#toDate').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
});
$('#date').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
});
$('#dateEnd').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
});

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}

var discountPrice = 0;
$('#tableCreateBiilingDisplay').on('keyup', 'input', function () {
    var sum1 = $(this).parent().parent().find('td')[4];
    var number1 = $(this).parent().parent().find('td')[2];
    var number2 = $(this).parent().parent().find('td')[3];

    var num1 = $(number1).find('input.number1').val();
    var num2 = $(number2).find('input.number2').val();

    if ('' != num1 && '' != num2) {
        var total = (num1) * (num2);
        $(sum1).find('input').val(total);
    } else {
        $(sum1).find('input').val(0);
    }

    // set allowenceSumTotal
    var sumvalues = $("[name='rentDateSum']");
    var sum = 0;
    for (var i = 0; i < sumvalues.length; i++) {
        if ($(sumvalues[i]).val() != "") {
            sum = sum + parseFloat($(sumvalues[i]).val());
        }
    }
    discountPrice = parseFloat(sum);
    $('#price').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/);
    $('#priceDisplay').text(parseFloat(sum).toFixed(2));

    discountPrice1 = parseFloat(sum);
    $('#price1').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/);
    $('#priceDisplay1').text(parseFloat(sum).toFixed(2));
    myFunction();
});

$(document).ready(function () {
    $('#myModal').on('hidden.bs.modal', function (e) {
        tableBiiling();
    })
    $('#MyModalPrintPDF').on('hidden.bs.modal', function (e) {
        tableBiiling();
    })

    tableBiiling();
    // dataCustomer(null);
    tableCreateBiiling1(null);
}); // end document

function myFunction() {
    // ไม่รวมภาษี
    var productPriceAll = 0;
    var discount = document.getElementById("discount").value;
    productPriceAll = discountPrice - (discountPrice * discount / 100)
    $('#discountPrice').text(parseFloat(discountPrice * discount / 100).toFixed(2));
    $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));

    var checkBox1 = document.getElementById("myCheck1");
    // Get the output text
    if (checkBox1.checked == true) {
        $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
        $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
    } else {
        $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
        $('#vat').text("00.00");
    }

    // รวมภาษี
    var productPriceAll1 = 0;
    var discount1 = document.getElementById("discount1").value;
    productPriceAll1 = discountPrice1 - (discountPrice1 * discount1 / 100)
    $('#discountProductPrice1').text(parseFloat(productPriceAll1).toFixed(2));
    $('#discountProductPriceSum1').text(parseFloat(productPriceAll1).toFixed(2));
    $('#discountPrice1').text(parseFloat(discountPrice1 * discount1 / 100).toFixed(2));

    var checkBox2 = document.getElementById("myCheck2");
    // Get the output text
    if (checkBox2.checked == true) {
        $('#productPriceAll1').text(parseFloat(productPriceAll1 - (productPriceAll1 * 7 / 100)).toFixed(2));
        $('#vat1').text(parseFloat(productPriceAll1 * 7 / 100).toFixed(2));
    } else {
        $('#productPriceAll1').text(parseFloat(productPriceAll1).toFixed(2));
        $('#vat1').text("00.00");
    }
}

// update status
function changeFunc($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    switch (type) {
        case "0":
            updateStatus(id, "0");
            break;
        case "2":
            updateStatus(id, "2");
            break;
        case "3":
            updateStatus(id, "3");
            break;
        case "5":
            updateQuotation(id, "taxInvoiceFlg");
            break;
    }
} // end update status

// update status vat
function statusVatFlg($i) {
    switch ($i) {
        case "1":
            document.getElementById("statusVat2").hidden = true;
            document.getElementById("statusVat1").hidden = false;
            break;
        case "2":
            document.getElementById("statusVat1").hidden = true;
            document.getElementById("statusVat2").hidden = false;
            break;
    }
} // end update status vat

// update Quotation
function updateQuotation(id, biiling) {
    console.log("TaxInvoice :: ", id + " :: " + biiling);

    if (biiling == "save" || biiling == "update") {
        document.getElementById("biilingFlgTitle").hidden = false;
        document.getElementById("taxInvoiceFlgTitle").hidden = true;

        document.getElementById("saveBiilingFlg").hidden = false;
        document.getElementById("saveTaxInvoiceFlg").hidden = true;
    } else if (biiling == "taxInvoiceFlg") {
        document.getElementById("biilingFlgTitle").hidden = true;
        document.getElementById("taxInvoiceFlgTitle").hidden = false;

        document.getElementById("saveBiilingFlg").hidden = true;
        document.getElementById("saveTaxInvoiceFlg").hidden = false;
    } else {
        document.getElementById("biilingFlgTitle").hidden = false;
        document.getElementById("taxInvoiceFlgTitle").hidden = true;

        document.getElementById("saveBiilingFlg").hidden = true;
        document.getElementById("saveTaxInvoiceFlg").hidden = true;
    }
    if (id != null) {
        $.ajax({
            type: "GET",
            url: "/api-f2/get-by-id/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $('#id').val(msg.id); //เลขที่เอกสาร
                $('#departmentId').val(msg.departmentId); //เลขที่เอกสาร
                $('#status').val(msg.type); //สถานะ
                $('#status').val(msg.status); //สถานะ
                $('#statusVat').val(msg.statusVat); //สถานะ ภาษี

                //ข้อมูลลูกค้า
                $('#customers').val(msg.customerName); //ชื่อบริษัทลูกค้า
                $('#departmentPass').val(msg.departmentPass); //รหัสสาขา
                $('#departmentName').val(msg.departmentName); //ชื่อสาขา
                $('#address').val(msg.address);
                $('#taxId').val(msg.taxId); //ที่อยู่

                // ไม่รวมภาษี
                $('#discount').val(msg.discount); //ส่วนลด
                $('#price').text(parseFloat(msg.price).toFixed(2)); //รวมเป็นเงิน
                $('#priceDisplay').text(parseFloat(msg.price).toFixed(2)); //รวมเป็นเงิน
                $('#productPriceAll').text(parseFloat(msg.productPriceAll).toFixed(2)); //ราคาสินค้าทั้งหมด
                $('#discountPrice').text(parseFloat(msg.discountPrice).toFixed(2)); //ราคาหักส่วนลด
                $('#discountProductPrice').text(parseFloat(msg.discountProductPrice).toFixed(2)); //
                $('#vat').text(parseFloat(msg.vat).toFixed(2)); //ภาษีมูลค่าเพิ่ม

                // รวมภาษี
                $('#discount1').val(msg.discount1); //ส่วนลด
                $('#price1').text(parseFloat(msg.price1).toFixed(2)); //รวมเป็นเงิน
                $('#priceDisplay1').text(parseFloat(msg.price1).toFixed(2)); //รวมเป็นเงิน
                $('#productPriceAll1').text(parseFloat(msg.productPriceAll1).toFixed(2)); //ราคาสินค้าทั้งหมด
                $('#discountPrice1').text(parseFloat(msg.discountPrice1).toFixed(2)); //ราคาหักส่วนลด
                $('#discountProductPrice1').text(parseFloat(msg.discountProductPrice1).toFixed(2)); //
                $('#discountProductPriceSum1').text(parseFloat(msg.discountProductPrice1).toFixed(2)); //
                $('#vat1').text(parseFloat(msg.vat1).toFixed(2)); //ภาษีมูลค่าเพิ่ม

                $('#note').val(msg.note); //หมาบเหตุ
                $('#date').val(msg.date); //วันที่
                $('#dateEnd').val(msg.dateEnd); //วันที่_ครบกำหนด
                $('#referenceDocument').val(msg.referenceDocument); //เลขที่เอกสาร
                $('#statusVat').val(msg.statusVat)
                if (msg.statusVat == 1) {
                    document.getElementById("statusVat1").hidden = false;
                    document.getElementById("statusVat2").hidden = true;
                } else {
                    document.getElementById("statusVat1").hidden = true;
                    document.getElementById("statusVat2").hidden = false;
                }
                switch (msg.vat) {
                    case 0:
                        document.getElementById("myCheck1").checked = false;
                        break;
                    default:
                        document.getElementById("myCheck1").checked = true;
                        break;
                }
                switch (msg.vat1) {
                    case 0:
                        document.getElementById("myCheck2").checked = false;
                        break;
                    default:
                        document.getElementById("myCheck2").checked = true;
                        break;
                }
                if (msg.officeType == 1) {
                    document.getElementById("officeType1").checked = true;
                    CheckOffice("1");
                } else {
                    document.getElementById("officeType2").checked = true;
                    CheckOffice("2");
                }
                // dataCustomer(msg.companyId)
                tableCreateBiiling1(msg.id);
            }
        })
    } else {
        genDepartment();
        tableCreateBiiling1(null);
        dataCustomer(null);

        $('#id').val(""); //เลขที่เอกสาร
        // $('#departmentId').val(""); //เลขที่เอกสาร
        $('#price').text(""); //รวมเป็นเงิน
        $('#priceDisplay').text(""); //รวมเป็นเงิน
        $('#productPriceAll').text(""); //ราคาสินค้าทั้งหมด
        $('#discount').val(""); //ส่วนลด
        $('#discountPrice').text(""); //ราคาหักส่วนลด
        $('#discountProductPrice').text(""); //
        $('#vat').text(""); //ภาษีมูลค่าเพิ่ม
        $('#note').val(""); //หมาบเหตุ
        $('#date').val(document.getElementById('date').value); //วันที่
        $('#dateEnd').val(""); //วันที่_ครบกำหนด
        $('#referenceDocument').val(""); //เลขที่เอกสาร
        $('#statusVat').val("1")
        document.getElementById("statusVat2").hidden = true;

        //ข้อมูลลูกค้า
        $('#customers').val(""); //ชื่อบริษัทลูกค้า
        $('#departmentPass').val("");//รหัสสาขา
        $('#departmentName').val(""); //ชื่อสาขา
        $('#officeType').val(""); //สาขา
        $('#address').val(""); //ที่อยู่
        $('#taxId').val(""); //ที่อยู่

        // ไม่รวมภาษี
        $('#discount').val(); //ส่วนลด
        $('#discountPrice').text(parseFloat(0).toFixed(2));
        $('#discountProductPrice').text(parseFloat(0).toFixed(2));
        $('#vat').text(parseFloat(0).toFixed(2));
        $('#price').text(parseFloat(0).toFixed(2));
        $('#productPriceAll').text(parseFloat(0).toFixed(2));

        // รวมภาษี
        $('#discount1').val(); //ส่วนลด
        $('#discountPrice1').text(parseFloat(0).toFixed(2));
        $('#discountProductPrice1').text(parseFloat(0).toFixed(2));
        $('#discountProductPriceSum1').text(parseFloat(0).toFixed(2)); //
        $('#vat1').text(parseFloat(0).toFixed(2));
        $('#price1').text(parseFloat(0).toFixed(2));
        $('#productPriceAll1').text(parseFloat(0).toFixed(2));

        document.getElementById("myCheck1").checked = true;
        document.getElementById("myCheck2").checked = true;
    }
    $('#myModal').modal('show');
} // end update Quotation

function genDepartment() {
    $.ajax({
        type: "GET",
        url: "/api-f2/generate-dep/B",
        success: function (msg) {
            console.log("dd" + msg)
            $('#departmentId').val(msg) //เลขที่เอกสาร
        }
    })
}

function updateStatus(id, status) {
    $.ajax({
        type: 'POST',
        url: '/api-f2/update-status/' + id + "/" + status,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/billing-list";
        }
    });
}

function CheckOffice(officeType) {
    if (officeType == 1) {
        document.getElementById("officeTypeCheck").hidden = true;
    } else {
        document.getElementById("officeTypeCheck").hidden = false;
    }
    console.log("CheckOffice :: " + officeType);
}

function dataCustomer(companyId) {
    $.ajax({
        type: "GET",
        url: "/api/customers-list/name/" + $('#setCompanyId').val(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (companyId != null) {
                for (var i = 0; i < msg.length; i++) {
                    $('#customers').append('<option value="' + companyId + '">' + companyId + '</option>');
                    $.ajax({
                        type: "GET",
                        url: "/api/customers-list/" + companyId,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            $('#customersPrint').text(msg.companyId);
                            $('#taxIdPrint').text("เลขประจำาตัวผู้เสียภาษี  " + msg.taxId);

                            $('#customers').val(msg.companyId);
                            $('#address').val(msg.address);
                            $('#taxId').val(msg.taxId);
                            if (msg.officeType == 1) {
                                $('#customersNamePrint').text(msg.customerName + " ( สำนักงานใหญ่ )");
                                document.getElementById("officeType1").checked = true;
                                CheckOffice("1");
                            } else {
                                $('#customersNamePrint').text(msg.customerName + " ( " + msg.department + " )");
                                document.getElementById("officeType2").checked = true;
                                CheckOffice("2");
                            }
                        }
                    });
                }
            } else {
                CheckOffice("1");
                $('#customers').val("");
                $('#address').val("");
                $('#taxId').val("");
                document.getElementById("officeType1").checked = false;
                document.getElementById("officeType2").checked = false;
                for (var i = 0; i < msg.length; i++) {
                    $('#customers').append('<option value="' + msg[i].companyId + '">' + msg[i].companyName + '</option>');
                }
                $('#customers').change(function () {
                    if ($('#customers').val() != "") {
                        $.ajax({
                            type: "GET",
                            url: "/api/customers-list/" + $('#customers').val(),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                $('#address').val(msg.address);
                                $('#taxId').val(msg.taxId);
                                if (msg.officeType == 1) {
                                    document.getElementById("officeType1").checked = true;
                                } else {
                                    document.getElementById("officeType2").checked = true;
                                }
                            }
                        });
                    } else {
                        $('#address').val("");
                        $('#taxId').val("");
                        document.getElementById("officeType1").checked = false;
                        document.getElementById("officeType2").checked = false;
                    }
                });
            }
        }
    });
}

var tableCreateQuotation

function tableCreateBiiling1(id) {
    tableCreateBiiling = $('#tableCreateBiilingDisplay').DataTable({
        lengthChange: false,
        "paging": false,
        searching: false,
        responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-f2/get-f2ListRepo-by-id/" + id,
        "bAutoWidth": false,
        "sAjaxDataProp": "",
        "aoColumns": [{
            "sWidth": "5%",
            "mRender": function (data,
                type, row, index) {
                index.row++;
                return '<div style="text-align: center"> ' + index.row + '</div>';
            }
        }, {
            "sWidth": "60%",
            "mRender": function (data,
                type, row, index) {
                if (row.product != null && row.productDetail != null) {
                    return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value="' + row.product + '"/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า">' + row.productDetail + ' </textarea></div>';
                } else if (row.product != null) {
                    return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value="' + row.product + '"/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า"></textarea></div>';
                } else if (row.productDetail != null) {
                    return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value=""/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า">' + row.productDetail + '</textarea></div>';
                } else {
                    return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value=""/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า"></textarea></div>';
                }

            }
        },
        {
            "sWidth": "10%",
            "mRender": function (data,
                type, row, index) {
                if (row.productNumber != null) {
                    return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productNumber' +
                        index.row +
                        '" value="' + row.productNumber + '"/>';
                } else {
                    return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productNumber' +
                        index.row +
                        '" value="1"/>';
                }
            }
        },
        {
            "sWidth": "10%",
            "mRender": function (data,
                type, row, index) {
                if (row.productPrice != null) {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productPrice' +
                        index.row +
                        '" value="' + row.productPrice + '"/>';
                } else {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productPrice' +
                        index.row +
                        '" value=""/>';
                }
            }
        },
        {
            "mData": "",
            "sWidth": "10%",
            "mRender": function (data,
                type, row, index) {
                if (row.productSumPrice != null) {
                    return '<input class="form-control sum1" style="width: 120px;height: 7mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                        index.row +
                        '" value="' + row.productSumPrice + '" disabled/>';
                } else {
                    return '<input class="form-control sum1" style="width: 120px;height: 7mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                        index.row +
                        '" value="" disabled/>';
                }
            }
        },
        {
            "mData": "",
            "sWidth": "5px",
            "mRender": function (data,
                type, row, index) {
                return '<div style="text-align:center"><a class="fas fa-trash" style="cursor: pointer;color: red"></a></div>';
            }
        }
        ]
    });

    $('#tableCreateBiilingDisplay').on('click', 'a', function () {
        tableCreateBiiling.row($(this).parents('tr')).remove().draw();

        var sumvalues = $("[name='rentDateSum']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        // ไม่รวมภาษี
        var productPriceAll = 0;
        var discount = document.getElementById("discount").value;
        productPriceAll = discountPrice - (discountPrice * discount / 100)
        $('#discountPrice').text(parseFloat(discountPrice * discount / 100).toFixed(2));
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));

        var checkBox1 = document.getElementById("myCheck1");
        // Get the output text
        if (checkBox1.checked == true) {
            $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
            $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
            $('#vat').text("00.00");
        }

        // รวมภาษี
        var productPriceAll1 = 0;
        var discount1 = document.getElementById("discount1").value;
        productPriceAll1 = discountPrice1 - (discountPrice1 * discount1 / 100)
        $('#discountProductPrice1').text(parseFloat(productPriceAll1).toFixed(2));
        $('#discountProductPriceSum1').text(parseFloat(productPriceAll1).toFixed(2));
        $('#discountPrice1').text(parseFloat(discountPrice1 * discount1 / 100).toFixed(2));
        var checkBox2 = document.getElementById("myCheck2");
        // Get the output text
        if (checkBox2.checked == true) {
            $('#productPriceAll1').text(parseFloat(productPriceAll1 - (productPriceAll1 * 7 / 100)).toFixed(2));
            $('#vat1').text(parseFloat(productPriceAll1 * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll1').text(parseFloat(productPriceAll1).toFixed(2));
            $('#vat1').text("00.00");
        }
    }); // end table
}

function Add() {
    tableCreateBiiling.row.add([tableCreateBiiling.data]).draw(false);
}

function remove() {
    tableCreateBiiling.rows('.selected').remove().draw();
}

var officeType;
$("#officeType1").change(function () {
    officeType = 1;
});
$("#officeType2").change(function () {
    officeType = 2;
});

function saveCreateQuotation() {
    var pass = true;
    pass = validateInput();

    if (pass) {
        var insertBiiling = {

            id: $('#id').val(), //ลูกค้า
            companyId: $('#customers').val(), //ลูกค้า
            departmentId: $('#departmentId').val(), //เลขที่เอกสาร
            type: "Biiling", //ประเภท
            status: "รออนุมัติ", //สถานะ
            statusVat: $('#statusVat').val(), //สถานะ ภาษี

            //ข้อมูลลูกค้า
            customerName: $('#customers').val(), //ชื่อบริษัทลูกค้า
            departmentPass: $('#departmentPass').val(), //รหัสสาขา
            departmentName: $('#departmentName').val(), //ชื่อสาขา
            officeType: officeType, //สาขา
            address: $('#address').val(), //ที่อยู่
            taxId: $('#taxId').val(), //ที่อยู่


            // ไม่รวมภาษี
            price: $('#price').text(), //รวมเป็นเงิน
            productPriceAll: $('#productPriceAll').text(), //ราคาสินค้าทั้งหมด
            discount: $('#discount').val(), //ส่วนลด
            discountPrice: $('#discountPrice').text(), //ราคาหักส่วนลด
            discountProductPrice: $('#discountProductPrice').text(), //
            vat: $('#vat').text(), //ภาษีมูลค่าเพิ่ม

            // รวมภาษี
            price1: $('#price1').text(), //รวมเป็นเงิน
            productPriceAll1: $('#productPriceAll1').text(), //ราคาสินค้าทั้งหมด
            discount1: $('#discount1').val(), //ส่วนลด
            discountPrice1: $('#discountPrice1').text(), //ราคาหักส่วนลด
            discountProductPrice1: $('#discountProductPrice1').text(), //
            vat1: $('#vat1').text(), //ภาษีมูลค่าเพิ่ม
            note: $('#note').val(), //หมาบเหตุ
            date: $('#date').val(), //วันที่
            dateEnd: $('#dateEnd').val(), //วันที่_ครบกำหนด
            referenceDocument: $('#referenceDocument').val(), //เลขที่เอกสาร
            createBy: $('#createBy').val(), //สร้างโดย
            f2ListModels: [],
        }
        var data = tableCreateBiiling.data();
        for (let i = 0; i < data.length; i++) {
            var d = {};
            d.product = $("#product" + i).val(); //สินค้า
            d.productDetail = $("#productDetail" + i).val(); //รายละเอียดสินค้า
            d.productNumber = $("#productNumber" + i).val(); //จำนวนสินค้า
            d.productPrice = $("#productPrice" + i).val(); //ราคาสินค้า
            d.productSumPrice = $("#productSumPrice" + i).val(); //รวมยอดสินค้า
            insertBiiling.f2ListModels.push(d)
        }

        console.log(JSON.stringify(insertBiiling));

        $.ajax({
            type: 'POST',
            url: '/api-f2/add-update',
            data: JSON.stringify(insertBiiling),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.location.href = "/billing-list";
            }
        });
    }
}

function saveCreateQuotationTaxInvoice() {
    var pass = true;
    pass = validateInput();
    $.ajax({
        type: "GET",
        url: "/api-f2/generate-dep/T",
        success: function (msg) {
            if (pass) {
                var insertBiiling = {
                    // id: $('#id').val(), //ลูกค้า
                    companyId: $('#customers').val(), //ลูกค้า
                    departmentId: msg, //เลขที่เอกสาร
                    type: "TaxInvoice", //ประเภท
                    status: "รออนุมัติ", //สถานะ
                    statusVat: $('#statusVat').val(), //สถานะ ภาษี
                    // ไม่รวมภาษี
                    price: $('#price').text(), //รวมเป็นเงิน
                    productPriceAll: $('#productPriceAll').text(), //ราคาสินค้าทั้งหมด
                    discount: $('#discount').val(), //ส่วนลด
                    discountPrice: $('#discountPrice').text(), //ราคาหักส่วนลด
                    discountProductPrice: $('#discountProductPrice').text(), //
                    vat: $('#vat').text(), //ภาษีมูลค่าเพิ่ม
                    // รวมภาษี
                    price1: $('#price1').text(), //รวมเป็นเงิน
                    productPriceAll1: $('#productPriceAll1').text(), //ราคาสินค้าทั้งหมด
                    discount1: $('#discount1').val(), //ส่วนลด
                    discountPrice1: $('#discountPrice1').text(), //ราคาหักส่วนลด
                    discountProductPrice1: $('#discountProductPrice1').text(), //
                    vat1: $('#vat1').text(), //ภาษีมูลค่าเพิ่ม
                    note: $('#note').val(), //หมาบเหตุ
                    date: $('#date').val(), //วันที่
                    dateEnd: $('#dateEnd').val(), //วันที่_ครบกำหนด
                    referenceDocument: $('#referenceDocument').val(), //เลขที่เอกสาร
                    createBy: $('#createBy').val(), //สร้างโดย
                    f2ListModels: [],
                }
                var data = tableCreateBiiling.data();
                for (let i = 0; i < data.length; i++) {
                    var d = {};
                    d.product = $("#product" + i).val(); //สินค้า
                    d.productDetail = $("#productDetail" + i).val(); //รายละเอียดสินค้า
                    d.productNumber = $("#productNumber" + i).val(); //จำนวนสินค้า
                    d.productPrice = $("#productPrice" + i).val(); //ราคาสินค้า
                    d.productSumPrice = $("#productSumPrice" + i).val(); //รวมยอดสินค้า
                    insertBiiling.f2ListModels.push(d)
                }

                console.log(JSON.stringify(insertBiiling));

                $.ajax({
                    type: 'POST',
                    url: '/api-f2/add-update',
                    data: JSON.stringify(insertBiiling),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        window.location.href = "/tax-invoice-list";
                    }
                });
            }
        }
    })
}

function tableBiiling() {
    // วันปัจจุบัน
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').value = today;

    var searchStatus = null;
    var fromDate = 0;
    var toDate = 0;
    if (document.getElementById('searchStatus').value != '') {
        searchStatus = document.getElementById('searchStatus').value;
    }
    if (document.getElementById('fromDate').value != '') {
        fromDate = document.getElementById('fromDate').value
    }
    if (document.getElementById('toDate').value != '') {
        toDate = document.getElementById('toDate').value;
    }

    $.ajax({
        type: "GET",
        url: "/api-f2/get-by/Biiling/" + $('#createBy').val() + "/" + searchStatus + "/" + fromDate + "/" + toDate,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // table seve offer price
            var tableBiiling = $('#tableBiiling').DataTable({
                paging: false,
                searching: false,
                "bDestroy": true,
                // "sAjaxSource": searchDate(),
                data: jQuery.parseJSON(JSON.stringify(msg)),
                "sAjaxDataProp": "",
                "order": [
                    [0, "desc"]
                ],
                "aoColumns": [{
                    'data': 'date',
                    "className": "text-center",
                    "sWidth": "8%",
                },
                {
                    'data': 'departmentId',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index, full) {
                        return '<a style="cursor: pointer;color: blue;" onclick="updateQuotation(' + "'" + row.id + "','" + null + "'" + ')">' + row.departmentId + '</a>';
                    }
                },
                {
                    'data': 'customerName',
                    "sWidth": "43%",
                },
                {
                    'data': '',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index, full) {
                        return row.productPriceAll.toFixed(2);
                    }
                },
                {
                    'data': '',
                    "className": "text-center",
                    "sWidth": "10%",
                    "mRender": function (data, type, row, index, full) {
                        if (row.status == 'รออนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                                    <option value="0' + row.id + '" style="color: black">รอวางบิล</option/>\n\
                                    <option value="2' + row.id + '" style="color: green">วางบิลแล้ว</option/>\n\
                                    <option value="5' + row.id + '" style="color: blue">สร้างใบกำกับภาษี</option/>\n\
                                    <option value="3' + row.id + '" style="color: red">ยกเลิก</option/>\n\
                                    </select>';
                        } else if (row.status == 'อนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                                    <option style="color: black">ดำเนิการเเล้ว</option/>\n\
                                    <option value="0' + row.id + '" style="color: red">ยกเลิก</option/>\n\
                                    </select>';
                        } else if (row.status == 'ไม่อนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: red">\n\
                                    <option value="3' + row.id + '" style="color: red">ไม่อนุมัติ</option/>\n\
                                    <option value="0' + row.id + '" style="color: green">รีเซต</option/>\n\
                                    </select>';
                        }
                    }
                },
                {
                    'data': '',
                    "className": "text-center",
                    "sWidth": "13%",
                    "mRender": function (data, type, row) {
                        if (row.status == 'ไม่อนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                        <option value="" style="color: black">ตัวเลือก</option/>\n\
                                        <option value="3' + row.id + '" style="color: red">ลบเอกสาร</option/>\n\
                                    </select>';
                            // return '<button hidden type="button" class="btn btn-warning btn-sm" onclick="updateQuotation(' + "'" + full.id + "','" + false + "'" + ')"><i  class="fas fa-edit"></i></button>\n\
                            //        <button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.id + "'" + ')"><i class="fas fa-trash"></i></button></div>\n\
                            //        <button hidden type="button" class="btn btn-primary btn-sm" onclick="><i  class="fas fa-print"></i></button></div>';
                        } else if (row.status == 'อนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                        <option value="" style="color: black">ตัวเลือก</option/>\n\
                                        <option value="2' + row.id + '" style="color: blue">พิมพ์เอกสาร</option/>\n\
                                    </select>';
                            // return '<button hidden type="button" class="btn btn-warning btn-sm" onclick="updateQuotation(' + "'" + row.id + "','" + false + "'" + ')"><i class="fas fa-edit"></i></button>\n\
                            // <button hidden type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + row.id + "'" + ')><i  class="fas fa-trash"></i></button></div>\n\
                            // <button type="button" class="btn btn-primary btn-sm" onclick="printPDF(' + "'" + row.id + "'" + ')" data-toggle="modal" data-target="#MyModalPrintPDF"><i class="fas fa-print"></i></button></div>';
                            // <button type="button" class="btn btn-info btn-sm" onclick="updateQuotation(' + "'" + full.id + "','" + true + "'" + ')"><i class="fas fa-clone"></i></button></div>';
                        } else if (row.status == 'รออนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                        <option value="" style="color: black">ตัวเลือก</option/>\n\
                                        <option value="1' + row.id + '" style="color: green">แก้ไขเอกสาร</option/>\n\
                                        <option value="2' + row.id + '" style="color: blue">พิมพ์เอกสาร</option/>\n\
                                        <option value="3' + row.id + '" style="color: red">ลบเอกสาร</option/>\n\
                                    </select>';
                            // return '<button type="button" class="btn btn-warning btn-sm" onclick="updateQuotation(' + "'" + row.id + "','" + false + "'" + ')""><i class="fas fa-edit"></i></button>\n\
                            // <button type="button" class="btn btn-primary btn-sm" onclick="printPDF(' + "'" + row.id + "'" + ')" data-toggle="modal" data-target="#MyModalPrintPDF"><i class="fas fa-print"></i></button></div>\n\
                            // <button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + row.id + "'" + ')"><i class="fas fa-trash"></i></button></div>';
                        }
                    }
                }
                ]
            });
        }
    });
}; // END tableQuotation

// update status
function changeStatus($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    console.log(type, id);
    switch (type) {
        case '1':
            updateQuotation(id, 'update');
            break;
        case '2':
            printPDF(id);
            $('#MyModalPrintPDF').modal('show');
            break;
        case '3':
            deleteId(id);
            break;
    }
}

function deleteId(id) {
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
        function () {
            $.ajax({
                url: '/api-f2/delete-f2/' + id,
                type: 'DELETE',
                success: function (result) {
                    if (result == "Success") {
                        window.location.href = "/billing-list";
                    } else {
                        alert("Delete Fail!!!");
                    }
                }
            });
        });
} //end delete

// validate
function validateInput() {
    var pass = true;

    if ('' == $('#dateEnd').val()) {
        dateEnd.focus()
        $('#error-dateEnd').removeClass("hide")
        pass = false;
    } else {
        $('#error-dateEnd').addClass("hide")
    }

    if ('' == $('#date').val()) {
        date.focus()
        $('#error-date').removeClass("hide")
        pass = false;
    } else {
        $('#error-date').addClass("hide")
    }

    if ('' == $('#customers').val()) {
        customers.focus()
        $('#error-customers').removeClass("hide")
        pass = false;
    } else {
        $('#error-customers').addClass("hide")
    }

    return pass;
} // end validate