import pygame
import pymsgbox
import random

WHITE = (255,255,255)
BLACK = (0, 0, 0)
RED = (255, 77, 38)
BLUE = (85, 164, 255)

# initialize and setup
pygame.init()
width, height = 500, 500
grid_size = 10
cell_size = width // grid_size
screen = pygame.display.set_mode((width, height)) # create window
pygame.display.set_caption("Click anywhere to start")

# dialogue
accepted_ans = ['pomba gira', 'erzuli freda', 'erzuli danto', 'oshun', 'kyra']
chosen_deity = None  # To store the user’s selection

# define functions
def greeting():
    pymsgbox.alert("Click OK to view the pantheon!")

def draw_grid():
    # this draws a 100 by 100 grid on the screen
    for x in range(0, width, cell_size): # loop to draw vertical grid lines
        pygame.draw.line(screen, (0, 0, 0), (x, 0), (x, height))
    for y in range(0, height, cell_size): # for horizontal
        pygame.draw.line(screen, (0, 0, 0), (0, y), (width, y))

def generate_random_positions():
    # generates 16 random positions on the grid
    numbers = list(range(1, 17))
    random.shuffle(numbers)
    
    positions = set()
    while len(positions) < 16:
        x = random.randint(0, grid_size - 1)
        y = random.randint(0, grid_size - 1)
        positions.add((x,y))
    
    return list(positions)

def draw_shells(positions):
    # displays numbers on the grid
    for (x, y) in positions:
        screen.blit(cowry_shell, (x * cell_size + 2, y * cell_size + 2))

positions = generate_random_positions()

# create sprite class
class Block(pygame.sprite.Sprite):

    # constructor. pass in the color of the block
    # and its x and y position
    def __init__(self, image_path, width, height, x, y):
        # call the parent class (sprite) constructor
        super().__init__()

        # load the image
        self.image = pygame.image.load(image_path)
        self.image = pygame.transform.scale(self.image, (width, height)) # resize

        # fetch the rectangle object that has the dimensions of the image (?)
        # update the position of this object by setting the values of rect.x and rect.y
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

# create block instances
pomba_gira = Block(r"C:\Users\kmeier4\Downloads\pombagira.PNG", 100, 100, 0, 400) # a red 50 by 50 block at 175, 125
erzuli_freda = Block(r"C:\Users\kmeier4\Downloads\erzulifreda.png", 100, 100, 400, 400)
erzuli_danto = Block(r"C:\Users\kmeier4\Downloads\erzulidanto.png", 100, 100, 400, 0)
oshun = Block(r"C:\Users\kmeier4\Downloads\oshun.png", 100, 100, 0, 0)
kyra = Block(r"C:\Users\kmeier4\Downloads\me.jpg", 100, 100, 200, 200)

cowry_shell = pygame.image.load("pngegg.png")
cowry_shell = pygame.transform.scale(cowry_shell, (cell_size - 5, cell_size - 5))

# create a sprite group and add the block
all_sprites = pygame.sprite.Group()
all_sprites.add(pomba_gira)
all_sprites.add(erzuli_freda)
all_sprites.add(erzuli_danto)
all_sprites.add(oshun)
all_sprites.add(kyra)

# main loop
running = True
question_asked = False

while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        # Step 1: User clicks mouse
        if event.type == pygame.MOUSEBUTTONDOWN:
            greeting() # Step 2: Show greeting
            screen.fill((255, 255, 255)) # step 6: fill the background
            all_sprites.draw(screen) # Step 3: Draw all sprites
            pygame.display.flip() # Update screen to show sprites
        
            # Step 4: Ask the question (only once)
            if not question_asked:
                chosen_deity = pymsgbox.prompt("Which deity would you like to convene with through divination?")

                if chosen_deity in accepted_ans:
                    pymsgbox.alert("Click OK to divine.") # Step 5: Start divination
                    
                    screen.fill((255, 255, 255)) # step 6: fill the background
                    draw_grid()
                    draw_shells(positions)
                    
                    pygame.display.flip()

                    offering = pymsgbox.prompt("Congratulations! " + chosen_deity.capitalize() + " would like to speak with you. What will you offer " + chosen_deity.capitalize() + "?").lower()
                        
                    if chosen_deity == "pomba gira":
                        accepted_offs = ("red candles","roses","perfume","cosmetics","champagne")
                    elif chosen_deity == "erzuli freda":
                        accepted_offs = ("fine items","makeup","perfume","sweets","fans")
                    elif chosen_deity == "erzuli danto":
                        accepted_offs = ("hot fruits","fried pork","red wine", "reve d'or perfume","chodye")
                    elif chosen_deity == "oshun":
                        accepted_offs = ("honey","pumpkin","peacock","vulture","sunflower")
                    elif chosen_deity == "kyra":
                        accepted_offs = ("fresh fruits","flowers","good luck charms","perfume","champagne")

                    if offering in accepted_offs:
                        pymsgbox.alert("Congratulations! " + chosen_deity.capitalize() + " accepted your offering. Game complete.")
                    else:
                        pymsgbox.alert("Hmm... " + chosen_deity.capitalize() + " is not pleased with that offering. Try again next time.")
                            
                else:
                    pymsgbox.alert("Invalid choice. Try again.")
                    pygame.quit()
        
                question_asked = True
    
    pygame.display.update() # refresh the screen

pygame.quit()