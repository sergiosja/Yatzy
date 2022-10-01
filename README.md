# Yatzy
Single-player yatzy, with a light and easy GUI.

Working demo [here](https://sergiosja.github.io/Yatzy/). Good luck!
Alternatively, clone the repository and run index.html. This way you can play whenever you want!
If you have never played Yatzy before, you might want to read the rules below.

## Rules
Roll the die and see what values you are presented. Generally, you can roll the die a maximum of three times. Here are your options:

```
Ones to Sixes
```
If your die show four ones (e.g. **1 1 1 1** 2 4) and you click ``Ones``, the value 4 will be added to your score. Think of it as ``Number`` times quantity of said number among your current die. If you manage a score of >=84 from the six options (4 x number for each number), you will be awarded 50 bonus points!

```
Pairs
```
If your die show a pair of ones (e.g **1 1** 2 3 4 5) and you click ``One pair``, the value 2 will be added to your score. ``Two pairs`` and ``Three pairs`` follow the same logic. If you have two pairs and you click ``One pair`` and there are more pairs present than you need, you will always be awarded the highest one.

```
Kinds
```
If your die show three of a kind (e.g. **1 1 1** 2 3 4) and you click ``Three of a Kind``, the value 3 will be added to your score. ``Four of a Kind`` and ``Five of a Kind`` follow the same logic. If you have, say *1 1 1* **2 2 2**, and you click ``Three of a Kind``, you will be awarded 6 rather than 3.

```
Straights
```
Here you have three different options. ``Small straight`` gives you 15 points if you have 1, 2, 3, 4 and 5 among your die values, ``Big straight`` gives you 20 points if you have 2, 3, 4, 5 and 6 among your die values, while ``Full straight`` gives you 21 points if your die values are 1, 2, 3, 4, 5 and 6. Just to be clear, the order does not matter. 1 5 4 3 6 2 is a full-fledged ``Full straight``. The **only** category where order matters is the ``Straight Flush``, which we will look at later.

```
Settlements
```
Here you also have three different options. ``Cottage`` is a combination of a ``One pair`` and a ``Three of a Kind`` (e.g. **1 1 1 2 2** 3), like a [full house in Poker](https://en.wikipedia.org/wiki/List_of_poker_hands#Full_house). ``House`` is two ``Three of a Kind`` (e.g. **1 1 1 2 2 2**), and ``Tower`` is a ``One pair`` and a ``Four of a Kind`` (e.g. **1 1 1 1 2 2**). The values must, obviously, be distinct. You will not be awarded a cottage if your die values are 1 1 1 1 1 2, even though it technically ticks the boxes.

```
Chance, Yatzy & Straight Flush
```
The big guns. ``Chance`` is the sum of all the dice values you currently have. This is a decent alternative when you cannot match the criteria of any other category. ``Yatzy`` is the big bonus, the name of the game, the king of the hill. If you manage six duplicates (e.g. 1 1 1 1 1 1) you will be awarded the sum of these, in addition to 100 points. Usually, the player who manages this wins the game. But! I have added my own, extra category. This is the ``Straight Flush`` I briefly mentioned earlier. As I said, order does not generally matter with these values. In fact, this is the only case where it does. Staright Flush is an ordered ``Big straight``. In person, this would not be possible, as the die fly everywhere as you throw them. Here on the other hand, it is more than possible, and I have made it the biggest prize, 150 points. In my experience, it is either super easy, or nearly impossible. 


## Extra
1. You got five sixes on your first roll and want to go for the Yatzy? To lock in values, simply click them. If their backround changes, they have successfully been locked, and their value will not change when you click "roll die" again.

2. You can throw the die more than 3 times in one turn, if you play your cards right. I have based my implementation on the [Maxi Yatzy version](https://en.wikipedia.org/wiki/Yatzy#Maxi_Yatzy), so unused rolls can be used in later rounds. Say you got a Yatzy on your first roll, and you decided to save that value. As the next round begins, you will now have 5 rolls (3 new + 2 unused from previous round). If you do well and save up, you increase your chances of getting (statistically) difficult scores like ``Yatzy``, ``Straight Flush`` and ``Three pairs``.

3. If you are out of rolls, and don't meet any of the scores' criterias, you will have to "sacrifice" a score. Click on the score you want to sacrifice, and you will be awarded 0 points for that particular score. After you click on a score, you cannot change it afterwards.

4. Once you finish, click the END GAME-button. This will display your score, and how long you have played. After you click the button you will not be able to play on, so make sure you have completed the game first! The modal will also automatically pop up if/when you finish all the scores.

5. When you finish a category, the colours will change and it will become unclickable. This way you will easier manage to keep track on what you have completed and what you have not.

6. To restart, simply click the restart button at the bottom of the screen.

7. Special thank you to Johanne Akerø, the best Yatzy player I know, who has tested every functionality rigorously.

## Want to create an account and save your scores to compete with a global leadertable?
Check [this](https://github.com/sergiosja/Mega-Yatzy) out!
