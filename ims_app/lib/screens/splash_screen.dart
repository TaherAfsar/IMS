import 'package:flutter/material.dart';
import 'package:ims_app/screens/home_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> animation;
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 500),
        lowerBound: 0.5,
        upperBound: 1);

    animation = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _controller.forward();
    navigateToMainContent();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  navigateToMainContent() async {
    await Future.delayed(const Duration(milliseconds: 1000));
    if (context.mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (ctx) => const HomeScreen(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff5ACE86),
      body: ScaleTransition(
        scale: animation,
        child: Center(
          child: SizedBox(
            height: 200,
            width: 200,
            child: ClipOval(
              clipBehavior: Clip.hardEdge,
              child: Image.asset(
                "assets/images/inventory.png",
                height: 200,
                width: 180,
                fit: BoxFit.fill,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
