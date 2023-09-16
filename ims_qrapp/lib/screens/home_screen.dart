import 'package:flutter/material.dart';
import 'package:ims_qrapp/data_representation.dart';
import 'package:lottie/lottie.dart';

import 'package:simple_barcode_scanner/simple_barcode_scanner.dart';

import 'dart:developer' as developer;
import 'package:permission_handler/permission_handler.dart';

class Mypage extends StatefulWidget {
  const Mypage({super.key});

  @override
  State<Mypage> createState() {
    return _Mypage();
  }
}

class _Mypage extends State<Mypage> {
  bool status = false;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }

  String result = "";
  @override
  Widget build(context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: const Text("Scan QR"),
        leading: IconButton(
          icon: const Icon(Icons.back_hand),
          onPressed: () {},
        ),
        actions: const [
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Icon(Icons.qr_code),
          )
        ],
      ),
      backgroundColor: Theme.of(context).colorScheme.tertiary,
      body: SafeArea(
          child: Column(
        children: [
          SizedBox(
            height: size.height * 0.1,
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
            child: Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
              child: SizedBox(
                height: size.height * 0.7,
                width: size.width,
                child: Column(children: [
                  const Padding(
                    padding: EdgeInsets.fromLTRB(16, 20, 16, 0),
                    child: Text(
                      "QR codes can provide more information about the product or service ",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  Lottie.asset(
                    "assets/Animation - 1694799173493.json",
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      var res = await Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                const SimpleBarcodeScannerPage(),
                          ));
                      setState(() {
                        developer.log(res);
                        if (res != "-1") {
                          Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) =>
                                  DataRepresentation(id: res.toString())));
                          result = res;
                        }
                      });
                    },
                    child: const Text('Open Scanner'),
                  ),
                ]),
              ),
            ),
          )
        ],
      )),
    );
  }
}



// void main() {
//   runApp(const MyApp());
// }

// class MyApp extends StatelessWidget {
//   const MyApp({Key? key}) : super(key: key);

//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Flutter Demo',
//       theme: ThemeData(
//         primarySwatch: Colors.blue,
//       ),
//       home: const HomePage(),
//     );
//   }
// }

// class HomePage extends StatefulWidget {
//   const HomePage({Key? key}) : super(key: key);

//   @override
//   State<HomePage> createState() => _HomePageState();
// }

// class _HomePageState extends State<HomePage> {
//   String result = '';
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Center(
//         child: Column(
//           mainAxisSize: MainAxisSize.min,
//           children: [
//             ElevatedButton(
//               onPressed: () async {
//                 var res = await Navigator.push(
//                     context,
//                     MaterialPageRoute(
//                       builder: (context) => const SimpleBarcodeScannerPage(),
//                     ));
//                 setState(() {
//                   if (res is String) {
//                     result = res;
//                   }
//                 });
//               },
//               child: const Text('Open Scanner'),
//             ),
//             Text('Barcode Result: $result'),
//           ],
//         ),
//       ),
//     );
//   }
// }