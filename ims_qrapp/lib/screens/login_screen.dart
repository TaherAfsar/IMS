import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;
import 'package:ims_qrapp/screens/home_screen.dart';
import 'package:ims_qrapp/screens/mainHomeScreen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final FocusNode _emailNode = FocusNode();
  bool isloading = false;

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    _emailNode.requestFocus();
    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _emailNode.dispose();
    super.dispose();
  }

  // var isLoading = false;
  void login(email, password) async {
    try {
      setState(() {
        isloading = true;
      });
      var res = await http.post(
          Uri.parse("http://192.168.151.85:4000/user/login/"),
          body: {"email": email, "password": password});
      if (res.statusCode >= 300) {
        throw Error();
      }
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("token", jsonDecode(res.body)['token']);
      print(jsonDecode(res.body)['token']);
      setState(() {
        isloading = false;
      });

      Navigator.of(context)
          .push(MaterialPageRoute(builder: (ctx) => const MyWidget()));
    } catch (e) {
      print(e);
      print("Error bc");
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.white,
        body: Padding(
          padding: const EdgeInsets.all(12),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Image.asset(
                  'assets/images/sign_in.gif',
                  height: 300,
                ),
                const Text(
                  "Login",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(
                  height: 5,
                ),
                Text(
                  "St. Francis Institute Of Technology",
                  style: TextStyle(
                    color: Colors.grey.shade400,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(
                  height: 40,
                ),
                Form(
                  // autovalidateMode: AutovalidateMode.always,
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _emailController,
                        validator: (value) {
                          final emailRegex =
                              RegExp(r'^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$');

                          if (!emailRegex.hasMatch(value!)) {
                            return 'Enter a valid email address';
                          }

                          return null;
                        },
                        focusNode: _emailNode,
                        keyboardType: TextInputType.name,
                        style: const TextStyle(fontSize: 18.0),
                        decoration: InputDecoration(
                          prefixIcon: const Icon(
                            Icons.email_outlined,
                            size: 30,
                          ),
                          labelText: 'Your Email',
                          hintText: 'Enter your email',
                          labelStyle: const TextStyle(fontSize: 18),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Colors.purple.shade400,
                            ),
                            borderRadius: const BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 15),
                      TextFormField(
                        obscureText: true,
                        controller: _passwordController,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Password is required';
                          }

                          if (value.length < 6) {
                            return 'Password must be at least 6 characters long';
                          }

                          return null;
                        },
                        style: const TextStyle(fontSize: 18),
                        // keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                          prefixIcon: const Icon(
                            Icons.lock,
                            size: 30,
                          ),
                          labelText: 'Your password',
                          hintText: 'Enter your password',
                          labelStyle: const TextStyle(fontSize: 18),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Colors.purple.shade400,
                            ),
                            borderRadius: const BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 20),
                        width: double.infinity,
                        decoration: const BoxDecoration(
                          borderRadius: BorderRadius.all(
                            Radius.circular(20),
                          ),
                        ), // Make the button full width
                        child: isloading
                            ? const Center(
                                child: CircularProgressIndicator(
                                  color: Colors.purple,
                                ),
                              )
                            : ElevatedButton(
                                onPressed: () async {
                                  FocusScopeNode focusScope =
                                      FocusScope.of(context);
                                  if (!focusScope.hasPrimaryFocus) {
                                    focusScope.unfocus();
                                  }
                                  try {
                                    if (_formKey.currentState!.validate()) {
                                      if (_emailController.text.isEmpty &&
                                          _passwordController.text.isEmpty) {
                                        return;
                                      } else {
                                        // Sending our user data to mongodb
                                        var email =
                                            _emailController.text.trim();
                                        var password =
                                            _passwordController.text.trim();

                                        login(email, password);
                                      }
                                    } else {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        const SnackBar(
                                          content: Text(
                                            'Please fix the errors in the form.',
                                          ),
                                        ),
                                      );
                                    }
                                  } catch (e) {
                                    print(e.toString());
                                  }
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.purple.shade500,
                                  padding: const EdgeInsets.all(
                                    16.0,
                                  ),
                                ),
                                child: const Text(
                                  'Login',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
