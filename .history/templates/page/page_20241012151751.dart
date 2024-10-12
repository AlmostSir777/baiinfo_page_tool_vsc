import 'package:baiinfo_classic/src/components/components.dart';
import 'package:flutter_base/flutter_base.dart';
import 'package:flutter/material.dart';

import '../view_model/$prefix_view_model.dart';

class $namePage extends StatefulWidget {
  const $namePage({Key? key}) : super(key: key);

  @override
  State<$namePage> createState() => $namePageState();
}

class $PageState extends BaseViewState<$namePage> {
  final $nameViewModel _viewModel = $nameViewModel();
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return BaseClassicContainer(
      model: _viewModel,
      leading: const SizedBox(),
      title: '',
    );
  }
}
