input.onSound(DetectedSound.Loud, function () {
    if (mode == 1) {
        mode = 2
        basic.showIcon(IconNames.Asleep)
    } else if (mode == 2) {
        mode = 1
        basic.showIcon(IconNames.Happy)
        LED()
    } else {
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
    mouvement += 1
    if (mouvement > 4) {
        mouvement = 0
    }
    LED()
})
function Spirale () {
    index2 = 0
    while (mouvement == 4 && (index2 < 32 && mode == 1)) {
        basic.showNumber(index2, 70)
RingbitCar.freestyle((index2 - 16) * 4, 100)
        basic.pause(500)
        index2 += 1
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Surprised)
    music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    mode = 0
    RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 87)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.left, 165)
    RingbitCar.steering_angle(RingbitCar.Direction_turn.right, 87)
})
function Montre_Nord () {
    if (input.compassHeading() > 10 && input.compassHeading() <= 180) {
        RingbitCar.freestyle(-2, 2)
    } else if (input.compassHeading() > 180 && input.compassHeading() <= 350) {
        RingbitCar.freestyle(2, -2)
    } else {
        RingbitCar.freestyle(100, 100)
        basic.pause(100)
        RingbitCar.freestyle(-100, -100)
        basic.pause(100)
        RingbitCar.freestyle(0, 0)
    }
}
function Tourne_droite () {
    RingbitCar.freestyle(100, -100)
}
function Tourne_gauche () {
    RingbitCar.freestyle(-100, 100)
}
function Infini () {
    index = 0
    while (mouvement == 0 && (index < 32 && mode == 1)) {
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
    LED()
})
input.onGesture(Gesture.Shake, function () {
    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    mode = 0
    basic.clearScreen()
})
function LED () {
    if (mouvement == 1) {
        basic.showLeds(`
            # # # # .
            # . . # .
            # . # # #
            # . . # .
            # # # . .
            `)
    } else if (mouvement == 2) {
        basic.showLeds(`
            . # # # #
            . # . . #
            # # # . #
            . # . . #
            . . # # #
            `)
    } else if (mouvement == 3) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (mouvement == 4) {
        basic.showLeds(`
            . # # # .
            # . . . #
            . . # . #
            . # . . #
            . . # # .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            # # . # #
            # . # . #
            # # . # #
            . . . . .
            `)
    }
}
let index = 0
let mouvement = 0
let mode = 0
let index2 = 0
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
basic.showIcon(IconNames.Angry)
mode = 0
mouvement = 0
let taille = 1
basic.forever(function () {
    if (mode == 1) {
        if (mouvement == 0) {
            Infini()
        } else if (mouvement == 1) {
            Tourne_droite()
        } else if (mouvement == 2) {
            Tourne_gauche()
        } else if (mouvement == 3) {
            Montre_Nord()
        } else {
            Spirale()
        }
    } else {
        RingbitCar.brake()
    }
})
