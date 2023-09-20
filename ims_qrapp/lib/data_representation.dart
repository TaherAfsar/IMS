import 'dart:convert';
// import 'package:file/file.dart';
import 'package:flutter/material.dart';
// import 'package:flutter_application_9/Model/data.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:ims_qrapp/models/data.dart';
import 'package:ims_qrapp/screens/thank_you_screen.dart';
import 'package:lottie/lottie.dart';
import 'dart:developer' as dev;
import 'package:path/path.dart';
import 'package:async/async.dart';
import 'dart:io';
import 'package:http/http.dart' as http;

import 'package:shared_preferences/shared_preferences.dart';

class DataRepresentation extends StatefulWidget {
  const DataRepresentation({required this.id, super.key});
  final String id;
  @override
  State<StatefulWidget> createState() {
    return _DataRepresentation();
  }
}

class _DataRepresentation extends State<DataRepresentation> {
  ItemData? data;
  final formKey = GlobalKey<FormState>();
  File? _image;

  bool isLoading = false;

  String title = "";
  String details = "";
  String itemName = "Coke";
  bool isLoading2 = false;

  @override
  void initState() {
    getData();
    // TODO: implement initState

    super.initState();
  }

  void getImage() async {}

  void getData() async {
    try {
      setState(() {
        isLoading = true;
      });
      SharedPreferences prefs = await SharedPreferences.getInstance();
      var token = prefs.getString("token");
      var res = await http.get(
          Uri.parse(
              "http://192.168.151.85:4000/item/get-itemById/${widget.id}"),
          headers: {"Authorization": "Bearer $token"});

      if (res.statusCode >= 300) {
        throw Error();
      }
      print(jsonDecode(res.body));
      setState(() {
        data = ItemData.fromJson(jsonDecode(res.body));
        isLoading = false;
      });
    } catch (e) {
      print(e);
      print("error");
    }
  }

  void putData() async {
    try {
      setState(() {
        isLoading2 = true;
      });
      print("hit");
      SharedPreferences prefs = await SharedPreferences.getInstance();
      var token = prefs.getString("token");
      var uri = Uri.parse(
          "http://192.168.151.85:4000/item/reportItemForDamage/${widget.id}");

      var request = http.MultipartRequest('POST', uri);
      request.files.add(await http.MultipartFile.fromPath(
        'image',
        _image!.path,
      ));
      request.headers['Authorization'] = "Bearer $token";
      request.fields['reportTitle'] = "ddfthyggy";
      request.fields['reportDetails'] = "ddfthyggy";
      request.fields['reportStartHours'] = "ddfthyggy";

      print(request);
      print(_image!.path);

      var response = await request.send();
      print(response.statusCode);
      response.stream.transform(utf8.decoder).listen((value) {
        print(value);
      });

      if (response.statusCode < 300) {
        setState(() {
          isLoading2 = false;
        });
      }
      // Navigator.push(context, MaterialPageRoute(builder: (c) => res.sed(8)));
    } catch (e) {}
  }

  @override
  Widget build(context) {
    void putData() async {
      formKey.currentState!.save();
      try {
        setState(() {
          isLoading2 = true;
        });
        print("hit");
        SharedPreferences prefs = await SharedPreferences.getInstance();
        var token = prefs.getString("token");
        var uri = Uri.parse(
            "http://192.168.151.85:4000/item/reportItemForDamage/${widget.id}");

        var request = http.MultipartRequest('POST', uri);
        request.files.add(await http.MultipartFile.fromPath(
          'image',
          _image!.path,
        ));
        request.headers['Authorization'] = "Bearer $token";
        request.fields['itemId'] = widget.id;
        request.fields['reportTitle'] = title;
        request.fields['reportDetails'] = details;
        request.fields['itemName'] = itemName;
        request.fields['reportStartHours'] = "ddfthyggy";

        print(request);
        print(_image!.path);

        var response = await request.send();
        print(response.statusCode);
        response.stream.transform(utf8.decoder).listen((value) {
          print(value);
        });

        if (response.statusCode < 300) {
          setState(() {
            isLoading2 = false;
          });
        }
        if (context.mounted) {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (c) => const ThankYouPage(
                        title: "Thank you",
                      )));
        }
      } catch (e) {}
    }

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: data == null
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : SafeArea(
              child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.0),
                  ),
                  elevation: 20,
                  child: Container(
                    decoration: BoxDecoration(
                        image: DecorationImage(
                            colorFilter: ColorFilter.mode(
                                Colors.black.withOpacity(0.2),
                                BlendMode.dstATop),
                            image: const AssetImage(
                              'assets/dmg.png',
                            ))),
                    height: size.height * 0.7,
                    width: size.width,
                    padding: const EdgeInsets.all(20),
                    child: Column(children: [
                      Text(
                        data!.name.toString(),
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(
                        height: 50,
                      ),
                      datarow(
                        "Category",
                        data!.category.toString(),
                      ),
                      datarow(
                        "EntryDate",
                        data!.entryDate.toString(),
                      ),
                      datarow(
                        "ExpiryDate",
                        data!.expirationDate.toString(),
                      ),
                      datarow(
                        "Location",
                        data!.location.toString(),
                      ),
                      datarow(
                        "status",
                        data!.status.toString(),
                      ),
                      const SizedBox(
                        height: 100,
                      ),
                      Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            ElevatedButton(
                                onPressed: () {
                                  showDialog(
                                    barrierDismissible: false,
                                    context: context,
                                    builder: (context) {
                                      return StatefulBuilder(
                                          builder: (context, setState) {
                                        return AlertDialog(
                                          content: SizedBox(
                                            height: size.height * 0.9,
                                            width: size.width,
                                            child: Form(
                                              key: formKey,
                                              child: SingleChildScrollView(
                                                child: !isLoading2
                                                    ? Column(
                                                        children: [
                                                          Container(
                                                            padding:
                                                                const EdgeInsets
                                                                    .all(8),
                                                            height:
                                                                size.height *
                                                                    0.30,
                                                            child: Stack(
                                                              children: [
                                                                CircleAvatar(
                                                                  radius: 130,
                                                                  backgroundImage: _image ==
                                                                          null
                                                                      ? const AssetImage(
                                                                          "assets/placeholder.png")
                                                                      : Image.file(
                                                                              _image!)
                                                                          .image,
                                                                ),
                                                                Positioned(
                                                                    top: 130,
                                                                    right: 30,
                                                                    child:
                                                                        IconButton(
                                                                      icon:
                                                                          Container(
                                                                        height:
                                                                            60,
                                                                        decoration: const BoxDecoration(
                                                                            color:
                                                                                Colors.grey,
                                                                            shape: BoxShape.circle),
                                                                        child:
                                                                            const Icon(
                                                                          Icons
                                                                              .edit,
                                                                          color:
                                                                              Colors.black,
                                                                        ),
                                                                      ),
                                                                      onPressed:
                                                                          () async {
                                                                        final image =
                                                                            await ImagePicker().pickImage(source: ImageSource.camera);
                                                                        if (image ==
                                                                            null) {
                                                                        } else {
                                                                          final imageTemp =
                                                                              File(image.path);
                                                                          setState(
                                                                              () {
                                                                            _image =
                                                                                imageTemp;
                                                                          });
                                                                        }
                                                                      },
                                                                    ))
                                                              ],
                                                            ),
                                                          ),
                                                          const SizedBox(
                                                            height: 20,
                                                          ),
                                                          TextFormField(
                                                            onSaved:
                                                                (newValue) {
                                                              setState(() {
                                                                title =
                                                                    newValue!;
                                                              });
                                                            },
                                                            decoration:
                                                                InputDecoration(
                                                                    border:
                                                                        OutlineInputBorder(
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                              10.0),
                                                                    ),
                                                                    prefixIcon:
                                                                        const Icon(Icons
                                                                            .title),
                                                                    label: const Text(
                                                                        "Title"),
                                                                    hintText:
                                                                        "Item"),
                                                            validator: (value) {
                                                              if (value !=
                                                                  null) {
                                                                if (value
                                                                    .isNotEmpty) {
                                                                  return null;
                                                                } else {
                                                                  return "Invalid Title";
                                                                }
                                                              } else {
                                                                return "Title cannot be empty";
                                                              }
                                                            },
                                                          ),
                                                          const SizedBox(
                                                            height: 20,
                                                          ),
                                                          TextFormField(
                                                            maxLines: 4,
                                                            onSaved:
                                                                (newValue) {
                                                              setState(() {
                                                                details =
                                                                    newValue!;
                                                              });
                                                            },
                                                            decoration:
                                                                InputDecoration(
                                                                    border:
                                                                        OutlineInputBorder(
                                                                      borderRadius:
                                                                          BorderRadius.circular(
                                                                              10.0),
                                                                    ),
                                                                    label: const Text(
                                                                        "Discription"),
                                                                    hintText:
                                                                        "Mention in brief"),
                                                            validator: (value) {
                                                              if (value !=
                                                                  null) {
                                                                if (value
                                                                    .isNotEmpty) {
                                                                  return null;
                                                                } else {
                                                                  return "Invalid Text";
                                                                }
                                                              } else {
                                                                return "Text cannot be empty";
                                                              }
                                                            },
                                                          ),
                                                          ElevatedButton(
                                                              onPressed:
                                                                  putData,
                                                              child: const Text(
                                                                  "submit"))
                                                        ],
                                                      )
                                                    : const CircularProgressIndicator(),
                                              ),
                                            ),
                                          ),
                                        );
                                      });
                                    },
                                  );
                                },
                                child: const Text("Request Item")),
                            const SizedBox(width: 5),
                            ElevatedButton(
                                onPressed: () {},
                                child: const Text("Report Item"))
                          ],
                        ),
                      )
                    ]),
                  ),
                ),
              ),
            )),
    );
  }

  Widget datarow(String field, String data) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: [
          Text(
            "$field : ",
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          Text(
            data,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          )
        ],
      ),
    );
  }
}
