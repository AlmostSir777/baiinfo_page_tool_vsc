import 'package:baiinfo_classic/src/components/components.dart';
import 'package:flutter_base/flutter_base.dart';
import 'package:flutter/material.dart';

import '../view_model/$prefix_view_model.dart';

class $prefixPage extends StatefulWidget {
  const $Page({Key? key}) : super(key: key);

  @override
  State<$prefixPage> createState() => $PageState();
}

class $PageState extends BaseViewState<$Page> {
  final $ViewModel _viewModel = $ViewModel();
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
