from django.shortcuts import render
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
import sys
import json
sys.path.append('/home/lettf/handwriting_line_generation')
from generate import main as gn
# Create your views here.
def home(request):
    return render(request, "home.html")
# /home/lettf/handwriting_line_generation/pretrained_weights/IAM_weights/IAMslant_noMask_charSpecSingleAppend_GANMedMT_autoAEMoPrcp2tightNewCTCUseGen_balB_hCF0.75_sMG/checkpoint-iteration175000.pth
# /home/lettf/lettf/lettf/static/img
# None
# None
# None 
# None
# image_count=2,path0=./outputs/3.png,path1=./outputs/4.png,path2=./outputs/1.png,text_gen="This is Cat"
# None
@csrf_exempt
def upload(request):
    fileList = request.FILES.getlist('files')
    txt = request.POST['txt']
    # obj = json.loads(request.body)
    # txt = obj['txt']
    print(txt)
    print(111)
    file_url = list()
    for item in fileList:
        # print(item)
        image = Image()
        image.img = item
        # img = cv2.imread(item,0)
        # print(item)
        # project_file.save()
        image.save()
        file_url.append("/home/lettf/lettf/lettf"+str(image))
        print(file_url)
    file_len = len(fileList)
    # print(file_len)
    arg = "image_count="+str(file_len)
    for f in range(len(file_url)):
        arg += ",path"+str(f)+"="+file_url[f]
    arg+=",text_gen='"+txt+"'"
    s = arg.split(',')
    # print(arg)
    arguments={}
    for pair in s:
        ss = pair.split('=')
        arguments[ss[0]]=ss[1]
    print(arguments)
    text_gen = arguments["text_gen"]
    print(f"text_gen : { text_gen }")
    img_txt = gn("/home/lettf/handwriting_line_generation/pretrained_weights/IAM_weights/IAMslant_noMask_charSpecSingleAppend_GANMedMT_autoAEMoPrcp2tightNewCTCUseGen_balB_hCF0.75_sMG/checkpoint-iteration175000.pth",
    "/home/lettf/lettf/lettf/home/static/img",
    arguments=arguments, 
    )
    # ttf 만들기 
    arg = "image_count=2"
    for f in range(2):
        arg += ",path"+str(f)+"="+file_url[f]
    s = arg.split(',')
    arguments={}
    for pair in s:
        ss = pair.split('=')
        arguments[ss[0]]=ss[1]
    alphabets = [f"{chr(c)} "+" ".join([chr(c_) for c_ in (
        list(range(97, 123)) + list(range(65, 91)))]) for c in (
        list(range(97, 123)) + list(range(65, 91)))]
    arguments["text_gen"] = alphabets
    ttf_txt = gn("/home/lettf/handwriting_line_generation/pretrained_weights/IAM_weights/IAMslant_noMask_charSpecSingleAppend_GANMedMT_autoAEMoPrcp2tightNewCTCUseGen_balB_hCF0.75_sMG/checkpoint-iteration175000.pth",
    "/home/lettf/lettf/lettf/home/static/img",
    arguments=arguments,
    alphabets=True 
    )
    essence = {
    'img_txt':img_txt,
    'ttf_txt':ttf_txt
    }
    return JsonResponse(essence)