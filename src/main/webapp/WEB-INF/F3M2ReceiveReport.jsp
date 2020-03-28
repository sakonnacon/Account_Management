<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>Receive Report</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>
	<link rel="stylesheet" href="/css/A4.css">

	<style>
		label,
		textarea,
		.input-top {
			margin-top: 10px;
		}

		.col-sm-3,
		.col-sm-4 {
			text-align: right;
		}

		p {
			color: red;
		}

		.hide {
			display: none;
		}
	</style>

</head>

<body>
	<!-- Page Wrapper -->
	<div id="wrapper">

		<!-- Sidebar -->
		<%@include file="TabBar.jsp"%>
		<!-- End of Sidebar -->
		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">
				<!-- Topbar -->
				<%@include file="Topbar.jsp"%>
				<!-- Begin Page Content -->
				<div class="container-fluid">
					<!-- <p>เอกสารขาย / ใบเสนอราคา</p> -->
					<!-- Content Row -->

					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">เอกสารซื้อ / ใบรับสินค้า (Receive Report)</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="table-responsive col-sm-12">
									<div class="row" style="margin-bottom: 10px;">
										<div class="col-sm-9"></div>
										<div class="col-sm-2">
											<select class="form-control" style="margin-top: 10px;" id="searchStatus">
												<option value="" style="color: blue;">ทั้งหมด</option>
												<option value="1" style="color: black;">รออนุมัติ</option>
												<option value="2" style="color: green;">ชำระเงินเเล้ว</option>
												<option value="3" style="color: red;">ไม่อนุมัติ</option>
											</select>
										</div>
										<div class="col-sm-1">
											<button type="button" class="btn btn-primary" style="margin-top: 10px"
												data-toggle="modal" data-target="#myModal"
												onclick="updateQuotation(null)">สร้างใหม่</button>
										</div>
									</div>
									<div class="row" style="margin-bottom: 10px;">
										<div class="col-sm-7"></div>
										<div class="col-sm-2"><label>เริ่มต้น : </label><input id="fromDate" value="" />
										</div>
										<div class="col-sm-2"><label>ถึง : </label><input id="toDate" /></div>
										<div class="col-sm-1">
											<button class="btn btn-primary" type="button" onclick="tableQuotation()"
												style="margin-top: 42px;width: 87px;"> ค้นหา <i
													class="fas fa-fw fa-search"></i></button>
										</div>
									</div>
									<table id="tableQuotation" class="table table-sm table-hover" width="100%">
										<thead class="bg-gradient-primary" style="color: white;">
											<tr>
												<th style="text-align: center;">วันที่</th>
												<th>เลขที่เอกสาร</th>
												<th>ชื่อลูกค้า</th>
												<th>จำนวนเงิน</th>
												<th style="text-align: center;">สถานะ</th>
												<th style="text-align: center;">ตัวเลือก</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>


		<!-- The Modal -->
		<div class="modal fade" id="myModal" role="dialog">
			<div class="modal-dialog modal-lg" style="max-width: 1400px;">
				<div class="modal-content">

					<!-- Modal Header -->
					<div class="modal-header">
						<h4 class="modal-title">สร้างใบรับสินค้า</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<!-- Modal body -->
					<div class="card-body p-0">
						<div class="row">
							<div class="col-sm-11"></div>
							<div class="col-sm-1">
								<div class="p-1">
									<div class="form-group row">
										<a href="#"><i class="fas fa-2x fa-print" style="margin-right: 10px;"></i></a>
										<a href="#"><i class="fas fa-2x fa-download"></i></a>
									</div>
								</div>
							</div>
							<div class="col-lg-5">
								<div class="p-3">
									<div class="form-group row">
										<div class="col-sm-4"><label>ชื่อลูกค้า</label></div>
										<div class="col-sm-8">
											<input id="id" hidden>
											<select class="form-control" style="margin-top: 10px;"
												placeholder="ใส่ชื่อลูกค้าที่ต้องการออกใบเสร็จรับเงิน" id="customers">
												<option value=""> ใส่ชื่อลูกค้าที่ต้องการออกใบเสร็จรับเงิน
												</option>
											</select>
											<p class="hide" id="error-customers">กรุณาเลือก
												ชื่อลูกค้า</p>
										</div>
										<div class="col-sm-4"><label>ที่อยู่</label></div>
										<div class="col-sm-8">
											<textarea class="form-control" style="height: 110px" id="address"
												disabled></textarea>
										</div>
										<div class="col-sm-4"><label>เลขประจำตัวผู้เสียภาษี</label></div>
										<div class="col-sm-8">
											<input type="text" style="margin-top: 10px;"
												class="form-control form-control" id="taxId"
												placeholder="เลขประจำตัวผู้เสียภาษี" id="taxId" disabled>
										</div>
										<div class="col-sm-4"><label>สำนักงาน / สาขาที่ </label></div>
										<div class="col-sm-8" style="margin-top: 6px;">
											<input style="margin-top: 10px;" type="radio" name="officeType"
												id="officeType1" disabled> สำนักงานใหญ่
											<input style="margin-top: 10px;" type="radio" name="officeType"
												id="officeType2" disabled> สาขาที่
											<!-- <input type="text" id="department"> -->
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3"></div>
							<div class="col-lg-4">
								<div class="p-3">
									<div class="form-group row">
										<div class="col-sm-4"><label>วันที่</label></div>
										<div class="col-sm-8">
											<input id="date" />
											<p class="hide" id="error-date">กรุณาเลือก
												วันที่</p>
										</div>
										<div class="col-sm-4"><label>เลขที่เอกสาร</label></div>
										<div class="col-sm-8">
											<input class="form-control" style="margin-top: 10px;" id="departmentId"
												placeholder="เลขที่เอกสาร">
										</div>
										<div class="col-sm-4"><label>ครบกำหนด</label></div>
										<div class="col-sm-8" style="margin-top: 10px;">
											<input id="dateEnd" />
											<p class="hide" id="error-dateEnd">กรุณาเลือก
												ครบกำหนด</p>
										</div>
										<div class="col-sm-4"><label>เลขอ้างอิง</label></div>
										<div class="col-sm-8">
											<input class="form-control" style="margin-top: 10px;" id=""
												placeholder="เลขอ้างอิง">
										</div>
										<div class="col-sm-4"><label style="margin-top: 50px;"><b>ราคาสินค้า</b></label>
										</div>
										<div class="col-sm-8">
											<!-- <h3 id="priceDisplay" style="margin-top: 40px;"></h3> -->
											<select class="form-control" id="statusVat" onchange="statusVatFlg(value)"
												style="margin-top: 42px;">
												<option value="1">ราคาไม่รวมภาษี</option>
												<option value="2">ราคารวมภาษี</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<!-- table -->

							<div class="table-responsive col-sm-12" style="margin-top: 12px;">
								<div style="margin-left: 2%;width: 97%;">
									<div class="card">
										<div class="card-body">
											<table id="tableCreateQuotationDisplay"
												class="table table-sm table-hover">
												<thead style="color: white;background-color: purple;">
													<tr>
														<th>ลำดับ</th>
														<th>รายละเอียด</th>
														<th>จำนวน</th>
														<th>ราคาต่อหน่วย</th>
														<th>ราคารวม</th>
														<th></th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th style="text-align: center;">
															<!-- <a href="#"><i class="fas fa-trash" id="remove"></i></a> -->
														</th>
														<th colspan="5">
															<button type="button" class="btn btn-default btn-sm"
																onclick="Add()">
																<i class="fas fa-plus" style="color: red"></i>
																เพิ่มรายการ
															</button>
														</th>
													</tr>
												</tfoot>
											</table>
											<div class="form-group row" style="margin-top: 30px;">
												<div class="col-sm-4">
													<p style="text-align: left;">หมายเหตุ</p>
													<textarea class="form-control" style="height: 80px"
														id="note"></textarea>
												</div>
												<div class="col-sm-5"></div>
												<div class="col-sm-3">
													<!-- ไม่รวมภาษี -->
													<div class="form-group row" id="statusVat1">
														<div class="col-sm-6 text-primary">รวมเป็นเงิน</div>
														<div class="col-sm-6">
															<p id="price">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">
															<div class="input-group input-group-sm mb-3">
																<div class="input-group-prepend">
																	<span class="input-group-text">ส่วนลด</span>
																</div>
																<input type="text" class="form-control" id="discount"
																	style="width: 40px; text-align: center;"
																	OnKeyPress="return chkNumber(this)"
																	onkeyup="myFunction()" maxlength="3">
																<div class="input-group-append">
																	<span class="input-group-text">%</span>
																</div>
															</div>
														</div>

														<div class="col-sm-6">
															<p id="discountPrice">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">ราคาหลังหักส่วนลด</div>
														<div class="col-sm-6" class="form-control">
															<p id="discountProductPrice">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">
															<input class="form-check-input" type="checkbox"
																id="myCheck1" onclick="myFunction()">
															ภาษีมูลค่าเพิ่ม 7%
														</div>
														<div class="col-sm-6">
															<p id="vat">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">จำนวนเงินทั้งสิ้น</div>
														<div class="col-sm-6">
															<p id="productPriceAll">0.00</p>
														</div>
													</div>
													<!-- รวมภาษี -->
													<div class="form-group row" id="statusVat2">
														<div class="col-sm-6 text-primary">รวมเป็นเงิน</div>
														<div class="col-sm-6">
															<p id="price1">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">
															<div class="input-group input-group-sm mb-3">
																<div class="input-group-prepend">
																	<span class="input-group-text">ส่วนลด</span>
																</div>
																<input type="text" class="form-control" id="discount1"
																	style="width: 40px; text-align: center;"
																	OnKeyPress="return chkNumber(this)"
																	onkeyup="myFunction()" maxlength="3">
																<div class="input-group-append">
																	<span class="input-group-text">%</span>
																</div>
															</div>
														</div>

														<div class="col-sm-6">
															<p id="discountPrice1">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">ราคาหลังหักส่วนลด</div>
														<div class="col-sm-6" class="form-control">
															<p id="discountProductPrice1">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">จำนวนเงินทั้งสิ้น</div>
														<div class="col-sm-6">
															<p id="discountProductPriceSum1">0.00</p>
														</div>
														<hr size="20" width="100%" color="red" align="center">
														<div class="col-sm-6 text-primary">
															<input class="form-check-input" type="checkbox"
																id="myCheck2" onclick="myFunction()">
															ภาษีมูลค่าเพิ่ม 7%
														</div>
														<div class="col-sm-6">
															<p id="vat1">0.00</p>
														</div>

														<div class="col-sm-6 text-primary">ราคาไม่รวมภาษี</div>
														<div class="col-sm-6">
															<p id="productPriceAll1">0.00</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--end table -->

						</div>
					</div>

					<!-- Modal footer -->
					<div class="modal-footer">
						<button type="button" class="btn btn-success" onclick="saveCreateQuotation()">บันทึก</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
					</div>
				</div>
			</div>
		</div>
		<!--End The Modal -->

		<div id="MyModalPrintPDF" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
			aria-hidden="true">
			<div class="modal-dialog modal-lg" style="max-width: 1100px;">
				<div class="modal-content">
					<div class="modal-footer border border-danger">
						<button id="btnPrint" type="button" class="btn btn-primary">พิมพ์</button>
						<button class="btn btn-secondary" data-dismiss="modal" aria-hidden="true">ยกเลิก</button>
					</div>
					<div>
						<%@include file="/WEB-INF/PrintPDF/PrintPDFF3M2.jsp" %>
					</div>
				</div>
			</div>
		</div>

		<!-- script -->
		<%@include file="/WEB-INF/Extensions/js.jsp" %>
		<script src="/data-table/F3M2ReceiveReport.js" type="text/javascript"></script>
		<script src="/print-pdf-js/f3m2-print-pdf-PurchaseOrderList.js" type="text/javascript"></script>

</body>

</html>