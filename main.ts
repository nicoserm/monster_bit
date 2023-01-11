input.onSound(DetectedSound.Loud, function () {
    if (mode == 1) {
        mode = 2
        basic.showIcon(IconNames.Asleep)
    } else if (mode == 2) {
        mode = 1
        basic.showIcon(IconNames.Happy)
    } else {
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    mouvement += 1
    if (mouvement > 2) {
        mouvement = 0
        basic.showString("M=0")
    } else {
        if (mouvement == 1) {
            basic.showString("M=1")
        } else {
            basic.showString("M=2")
        }
    }
    if (mode == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (mode == 2) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.Angry)
    }
})
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Surprised)
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Sine,
    5000,
    1,
    255,
    0,
    500,
    SoundExpressionEffect.Tremolo,
    InterpolationCurve.Curve
    ), SoundExpressionPlayMode.UntilDone)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 87)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.left, 165)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 87)
})
function Tourne_droite () {
    RingbitCar.freestyle(100, -100)
}
function Tourne_gauche () {
    RingbitCar.freestyle(-100, 100)
}
function Infini () {
    index = 0
    while (index < 32 && mode == 1) {
        if (index >= 8 && index < 16) {
            RingbitCar.freestyle(3, 100)
        } else if (index >= 23 && index < 32) {
            RingbitCar.freestyle(100, 2)
        } else {
            RingbitCar.forward()
        }
        basic.pause(500)
        index += 1
    }
}
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Happy)
    mode = 1
})
input.onGesture(Gesture.Shake, function () {
    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    mode = 0
    basic.clearScreen()
})
let index = 0
let mouvement = 0
let mode = 0
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
basic.showIcon(IconNames.Angry)
mode = 0
mouvement = 0
basic.forever(function () {
    if (mode == 1) {
        if (mouvement == 0) {
            Infini()
        } else if (mouvement == 1) {
            Tourne_droite()
        } else {
            Tourne_gauche()
        }
    } else {
        RingbitCar.brake()
    }
})
