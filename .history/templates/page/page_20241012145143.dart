import 'package:baiinfo_classic/src/components/components.dart';
import 'package:flutter_base/flutter_base.dart';
import 'package:flutter/material.dart';

import '../view_model/purchase_view_model.dart';

class PurchasePage extends StatefulWidget {
  const PurchasePage({Key? key}) : super(key: key);

  @override
  State<PurchasePage> createState() => _PurchasePageState();
}

class _PurchasePageState extends BaseViewState<PurchasePage> {
  final PurchaseViewModel _viewModel = PurchaseViewModel();
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return BaseClassicContainer(
      model: _viewModel,
      leading: const SizedBox(),
      title: '选购',
    );
  }
}
