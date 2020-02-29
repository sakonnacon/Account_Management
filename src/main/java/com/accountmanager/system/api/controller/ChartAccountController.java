package com.accountmanager.system.api.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.ChartAccounts;
import com.accountmanager.system.model.ChartAccountsLevel1;
import com.accountmanager.system.model.ChartAccountsLevel2;
import com.accountmanager.system.model.ChartAccountsLevel3;
import com.accountmanager.system.model.ChartAccountsLevel4;
import com.accountmanager.system.model.ChartAccountsLevel5;
import com.accountmanager.system.pojo.ChartAccountPojo;
import com.accountmanager.system.pojo.ChartAccountStep2Pojo;
import com.accountmanager.system.pojo.ChartAccountStep3Pojo;
import com.accountmanager.system.pojo.ChartAccountStep4Pojo;
import com.accountmanager.system.pojo.ChartAccountStep5Pojo;
import com.accountmanager.system.pojo.StatePojo;
import com.accountmanager.system.repository.ChartAccountsLevel1Repository;
import com.accountmanager.system.repository.ChartAccountsLevel2Repository;
import com.accountmanager.system.repository.ChartAccountsLevel3Repository;
import com.accountmanager.system.repository.ChartAccountsLevel4Repository;
import com.accountmanager.system.repository.ChartAccountsLevel5Repository;
import com.accountmanager.system.repository.ChartAccountsRepository;

@RestController
@RequestMapping("/api-chart-account")
public class ChartAccountController {

	@Autowired
	ChartAccountsRepository chartAccountsRepo;
	@Autowired
	ChartAccountsLevel1Repository chartAccountsLv1Repo;
	@Autowired
	ChartAccountsLevel2Repository chartAccountsLv2Repo;
	@Autowired
	ChartAccountsLevel3Repository chartAccountsLv3Repo;
	@Autowired
	ChartAccountsLevel4Repository chartAccountsLv4Repo;
	@Autowired
	ChartAccountsLevel5Repository chartAccountsLv5Repo;

	@GetMapping("/get-all")
	private Iterable<ChartAccountPojo> getAll() {
		List<ChartAccountPojo> chartAccountPojos = new ArrayList<ChartAccountPojo>();

		Iterable<ChartAccounts> accounts = chartAccountsRepo.findAll();

		for (ChartAccounts chartAccounts : accounts) {
			ChartAccountPojo chartAccountsPojo = new ChartAccountPojo();

			if (chartAccounts.getStep1() != 0) {
				chartAccountsPojo.setText(chartAccounts.getText());
				chartAccountsPojo.setStep(String.valueOf(chartAccounts.getStep1()));
				if (chartAccounts.getUpdateDate() != null) {
					chartAccountsPojo.setDate(chartAccounts.getUpdateDate());
				} else {
					chartAccountsPojo.setDate(chartAccounts.getCreateDate());
				}
				List<ChartAccountStep2Pojo> chartAccountStep2Pojos = new ArrayList<ChartAccountStep2Pojo>();

				for (ChartAccounts chartAccounts2 : accounts) {
					ChartAccountStep2Pojo chartAccountStep2Pojo = new ChartAccountStep2Pojo();
					if (chartAccounts2.getStep2() != 0) {
						if (chartAccounts2.getStep2() == chartAccounts.getStep1()) {
							chartAccountStep2Pojo.setText(chartAccounts2.getText());
							chartAccountStep2Pojo.setIcon(chartAccounts2.getIcon());
							chartAccountStep2Pojo.setStep(String.valueOf(chartAccounts2.getStep2()));
							if (chartAccounts2.getUpdateDate() != null) {
								chartAccountStep2Pojo.setDate(chartAccounts2.getUpdateDate());
							} else {
								chartAccountStep2Pojo.setDate(chartAccounts2.getCreateDate());
							}
							chartAccountStep2Pojos.add(chartAccountStep2Pojo);
							List<ChartAccountStep3Pojo> chartAccountStep3Pojos = new ArrayList<ChartAccountStep3Pojo>();

							for (ChartAccounts chartAccounts3 : accounts) {
								ChartAccountStep3Pojo chartAccountStep3Pojo = new ChartAccountStep3Pojo();
								if (chartAccounts3.getStep3() != 0) {
									if (chartAccounts3.getStep3() == Integer.parseInt(chartAccounts2.getIdStep2())) {
										chartAccountStep3Pojo.setText(chartAccounts3.getText());
										chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());
										chartAccountStep3Pojo.setStep(String.valueOf(chartAccounts3.getStep3()));
										chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());
										if (chartAccounts3.getUpdateDate() != null) {
											chartAccountStep3Pojo.setDate(chartAccounts3.getUpdateDate());
										} else {
											chartAccountStep3Pojo.setDate(chartAccounts3.getCreateDate());
										}
										chartAccountStep3Pojos.add(chartAccountStep3Pojo);
										chartAccountStep2Pojo.setChildren(chartAccountStep3Pojos);

										List<ChartAccountStep4Pojo> chartAccountStep4Pojos = new ArrayList<ChartAccountStep4Pojo>();
										for (ChartAccounts chartAccounts4 : accounts) {
											ChartAccountStep4Pojo chartAccountStep4Pojo = new ChartAccountStep4Pojo();
											if (chartAccounts4.getStep4() != 0) {
												if (Integer.parseInt(chartAccounts3.getIdStep3()) == chartAccounts4
														.getStep4()) {
													chartAccountStep4Pojo.setText(chartAccounts4.getText());
													chartAccountStep4Pojo.setIcon(chartAccounts4.getIcon());
													chartAccountStep4Pojo
															.setStep(String.valueOf(chartAccounts4.getStep4()));
													chartAccountStep4Pojo.setIcon(chartAccounts4.getIcon());
													if (chartAccounts4.getUpdateDate() != null) {
														chartAccountStep4Pojo.setDate(chartAccounts4.getUpdateDate());
													} else {
														chartAccountStep4Pojo.setDate(chartAccounts4.getCreateDate());
													}
													chartAccountStep4Pojos.add(chartAccountStep4Pojo);
													chartAccountStep3Pojo.setChildren(chartAccountStep4Pojos);
												}
											}
										}
									}
								}
							}

						}
						chartAccountsPojo.setChildren(chartAccountStep2Pojos);
					}
				}
				chartAccountPojos.add(chartAccountsPojo);
			}
		}

		chartAccountPojos
				.sort((e1, e2) -> new Long(e1.getDate().getTime()).compareTo(new Long(e2.getDate().getTime())));

		return chartAccountPojos;
	}

	@GetMapping("/get-all-new")
	private Iterable<ChartAccountPojo> getAllNew() {

		Iterable<ChartAccountsLevel1> accounts = chartAccountsLv1Repo.findAll();

		List<ChartAccountPojo> chartAccountPojos = new ArrayList<ChartAccountPojo>();
		for (ChartAccountsLevel1 chartAccounts : accounts) {
			ChartAccountPojo chartAccountsPojo = new ChartAccountPojo();

			chartAccountsPojo.setId(chartAccounts.getId());
			chartAccountsPojo.setIcon(chartAccounts.getIcon());
			chartAccountsPojo.setDetail(chartAccounts.getDetail());
			chartAccountsPojo.setTextEdit(chartAccounts.getText());
			chartAccountsPojo.setPassCode(chartAccounts.getPassCode());
			chartAccountsPojo.setText(chartAccounts.getPassCode() + " " + chartAccounts.getText());
			chartAccountsPojo.setIcon(chartAccounts.getIcon());

			StatePojo statePojos = new StatePojo();
			statePojos.setOpened(true);
			statePojos.setSelected(true);

			chartAccountsPojo.setState(statePojos);

			List<ChartAccountStep2Pojo> chartAccountStep2Pojos = new ArrayList<ChartAccountStep2Pojo>();

			for (ChartAccountsLevel2 chartAccounts2 : chartAccounts.getChartAccountsLevel2s()) {
				chartAccountStep2Pojos.sort(
						(e1, e2) -> new String(e1.getText().toString()).compareTo(new String(e2.getText().toString())));

				ChartAccountStep2Pojo chartAccountStep2Pojo = new ChartAccountStep2Pojo();

				chartAccountStep2Pojo.setId(chartAccounts2.getId());
				chartAccountStep2Pojo.setIcon(chartAccounts2.getIcon());
				chartAccountStep2Pojo.setDetail(chartAccounts2.getDetail());
				chartAccountStep2Pojo.setTextEdit(chartAccounts2.getText());
				chartAccountStep2Pojo.setPassCode(chartAccounts2.getPassCode());
				chartAccountStep2Pojo.setText(chartAccounts2.getPassCode() + " " + chartAccounts2.getText());
				chartAccountStep2Pojo.setIcon(chartAccounts2.getIcon());

				chartAccountStep2Pojos.add(chartAccountStep2Pojo);
				List<ChartAccountStep3Pojo> chartAccountStep3Pojos = new ArrayList<ChartAccountStep3Pojo>();

				for (ChartAccountsLevel3 chartAccounts3 : chartAccounts2.getChartAccountsLevel3s()) {
					chartAccountStep3Pojos.sort((e1, e2) -> new String(e1.getText().toString())
							.compareTo(new String(e2.getText().toString())));

					ChartAccountStep3Pojo chartAccountStep3Pojo = new ChartAccountStep3Pojo();
					chartAccountStep3Pojo.setId(chartAccounts3.getId());
					chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());
					chartAccountStep3Pojo.setDetail(chartAccounts3.getDetail());
					chartAccountStep3Pojo.setTextEdit(chartAccounts3.getText());
					chartAccountStep3Pojo.setPassCode(chartAccounts3.getPassCode());
					chartAccountStep3Pojo.setText(chartAccounts3.getPassCode() + " " + chartAccounts3.getText());
					chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());

					chartAccountStep3Pojos.add(chartAccountStep3Pojo);
					chartAccountStep2Pojo.setChildren(chartAccountStep3Pojos);

					List<ChartAccountStep4Pojo> chartAccountStep4Pojos = new ArrayList<ChartAccountStep4Pojo>();
					for (ChartAccountsLevel4 chartAccounts4 : chartAccounts3.getChartAccountsLevel4s()) {
						chartAccountStep4Pojos.sort((e1, e2) -> new String(e1.getText().toString())
								.compareTo(new String(e2.getText().toString())));

						ChartAccountStep4Pojo chartAccountStep4Pojo = new ChartAccountStep4Pojo();
						chartAccountStep4Pojo.setId(chartAccounts4.getId());
						chartAccountStep4Pojo.setIcon(chartAccounts4.getIcon());
						chartAccountStep4Pojo.setDetail(chartAccounts4.getDetail());
						chartAccountStep4Pojo.setTextEdit(chartAccounts4.getText());
						chartAccountStep4Pojo.setPassCode(chartAccounts4.getPassCode());
						chartAccountStep4Pojo.setText(chartAccounts4.getPassCode() + " " + chartAccounts4.getText());
						chartAccountStep4Pojo.setIcon(chartAccounts4.getIcon());

						chartAccountStep4Pojos.add(chartAccountStep4Pojo);
						chartAccountStep3Pojo.setChildren(chartAccountStep4Pojos);
						
						List<ChartAccountStep5Pojo> chartAccountStep5Pojos = new ArrayList<ChartAccountStep5Pojo>();
						for (ChartAccountsLevel5 chartAccounts5 : chartAccounts4.getChartAccountsLevel5s()) {
							

							ChartAccountStep5Pojo chartAccountStep5Pojo = new ChartAccountStep5Pojo();
							chartAccountStep5Pojo.setId(chartAccounts5.getId());
							chartAccountStep5Pojo.setIcon(chartAccounts5.getIcon());
							chartAccountStep5Pojo.setDetail(chartAccounts5.getDetail());
							chartAccountStep5Pojo.setTextEdit(chartAccounts5.getText());
							chartAccountStep5Pojo.setPassCode(chartAccounts5.getPassCode());
							chartAccountStep5Pojo.setText(chartAccounts5.getPassCode() + " " + chartAccounts5.getText());
							chartAccountStep5Pojo.setIcon(chartAccounts5.getIcon());

							chartAccountStep5Pojos.add(chartAccountStep5Pojo);
							chartAccountStep5Pojos.sort((e1, e2) -> new String(e1.getText().toString())
									.compareTo(new String(e2.getText().toString())));
							chartAccountStep4Pojo.setChildren(chartAccountStep5Pojos);
						}
					}
				}

				chartAccountsPojo.setChildren(chartAccountStep2Pojos);
			}
			chartAccountPojos.add(chartAccountsPojo);
		}

		chartAccountPojos
				.sort((e1, e2) -> new String(e1.getText().toString()).compareTo(new String(e2.getText().toString())));

		return chartAccountPojos;
	}

	// Convert Date to Timestamp
	static Date date = new Date();
	static Timestamp ts = new Timestamp(new Date().getTime());

	@PostMapping("/add-update")
	private ChartAccounts addUpdate(@RequestBody ChartAccounts chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		return chartAccountsRepo.save(chartAccounts);
	}
	
	@GetMapping("/get-by-id/{id}")
	private ChartAccountPojo getChartAccountById(@PathVariable("id") String id) {
		ChartAccountPojo accountPojo = new ChartAccountPojo();
		try {
			ChartAccountsLevel1 level1 =  chartAccountsLv1Repo.findOne(id);
			ChartAccountsLevel2 level2 =  chartAccountsLv2Repo.findOne(id);
			ChartAccountsLevel3 level3 =  chartAccountsLv3Repo.findOne(id);
			ChartAccountsLevel4 level4 =  chartAccountsLv4Repo.findOne(id);
			ChartAccountsLevel5 level5 =  chartAccountsLv5Repo.findOne(id);
			if (level1 != null) {
				accountPojo.setId(level1.getId());
				accountPojo.setText(level1.getText());
				accountPojo.setIcon(level1.getIcon());
				accountPojo.setPassCode(level1.getPassCode());
			} else if (level2 != null) {
				accountPojo.setId(level2.getId());
				accountPojo.setText(level2.getText());
				accountPojo.setIcon(level2.getIcon());
				accountPojo.setPassCode(level2.getPassCode());
			} else if (level3 != null) {
				accountPojo.setId(level3.getId());
				accountPojo.setText(level3.getText());
				accountPojo.setIcon(level3.getIcon());
				accountPojo.setPassCode(level3.getPassCode());
			} else if (level4 != null) {
				accountPojo.setId(level4.getId());
				accountPojo.setText(level4.getText());
				accountPojo.setIcon(level4.getIcon());
				accountPojo.setPassCode(level4.getPassCode());
			} else if (level5 != null) {
				accountPojo.setId(level5.getId());
				accountPojo.setText(level5.getText());
				accountPojo.setIcon(level5.getIcon());
				accountPojo.setPassCode(level5.getPassCode());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return accountPojo;
	}

	@GetMapping("/get-chartAccount-lv1")
	private Iterable<ChartAccountsLevel1> getChartAccountLv1() {
		return chartAccountsLv1Repo.findAll();
	}

	@PostMapping("/add-updat-lv1")
	private ChartAccountsLevel1 addUpdateLv1(@RequestBody ChartAccountsLevel1 chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		chartAccounts.setCreateDate(ts);
		return chartAccountsLv1Repo.save(chartAccounts);
	}

	@PostMapping("/add-updat-lv2")
	private ChartAccountsLevel2 addUpdateLv2(@RequestBody ChartAccountsLevel2 chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		chartAccounts.setCreateDate(ts);
		return chartAccountsLv2Repo.save(chartAccounts);
	}

	@PostMapping("/add-updat-lv3")
	private ChartAccountsLevel3 addUpdateLv3(@RequestBody ChartAccountsLevel3 chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		chartAccounts.setCreateDate(ts);
		return chartAccountsLv3Repo.save(chartAccounts);
	}

	@PostMapping("/add-updat-lv4")
	private ChartAccountsLevel4 addUpdateLv4(@RequestBody ChartAccountsLevel4 chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		chartAccounts.setCreateDate(ts);
		return chartAccountsLv4Repo.save(chartAccounts);
	}

	@PostMapping("/add-updat-lv5")
	private ChartAccountsLevel5 addUpdateLv5(@RequestBody ChartAccountsLevel5 chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		chartAccounts.setCreateDate(ts);
		return chartAccountsLv5Repo.save(chartAccounts);
	}

}
