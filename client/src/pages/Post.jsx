import { useState, useRef } from "react";
import { Image, Video, X } from "lucide-react";
import { useSelector } from "react-redux"
import axios from "axios"
const AVATAR_URL = "https://i.pravatar.cc/150?img=3";
const USER_NAME = "Alex Johnson";

export default function PostCard() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const fileRef = useRef(null);

    const previewUrl = image ? URL.createObjectURL(image) : null;
    const token = useSelector((state) => state.user.token)

    const handlePost = async () => {

        const formData = new FormData();
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await axios.post("http://localhost:3000/api/auth/post", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!res) {
                return alert("post not created")
            }

            setContent("");
            setImage(null);
            setIsExpanded(false);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || error.response?.data?.error || "Error creating post");
        }
    };

    return (
        <div className="space-y-4 w-full flex justify-center flex-col items-center py-10">

            <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-semibold text-gray-500 shrink-0">
                        <img src={AVATAR_URL} alt="profile" className="h-full w-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <button
                        className="flex-1 text-left px-4 py-3 h-12 text-sm font-normal bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-text text-gray-500"
                        onClick={() => setIsExpanded(true)}
                    >
                        Start a post
                    </button>
                </div>

                <div className="border-t border-gray-200 my-3" />

                <div className="flex justify-center gap-2">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 text-sm text-gray-500 hover:bg-gray-100 py-2 rounded-lg transition-colors font-medium"
                        onClick={() => {
                            setIsExpanded(true);
                            fileRef.current?.click();
                        }}
                    >
                        <Image size={20} className="text-blue-500" />
                        Photo
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center gap-2 text-sm text-gray-500 hover:bg-gray-100 py-2 rounded-lg transition-colors font-medium"
                    >
                        <Video size={20} className="text-green-500" />
                        Video
                    </button>
                </div>
            </div>

            {/* Expanded post editor */}
            {isExpanded && (
                <div className="bg-white rounded-xl w-1/3 shadow-lg border border-gray-200 p-5 mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-semibold text-gray-500 shrink-0">
                                <img src={AVATAR_URL} alt="profile" className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-sm text-gray-900">{USER_NAME}</h2>
                                <p className="text-xs text-gray-500">Post to anyone</p>
                            </div>
                        </div>
                        <button
                            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
                            onClick={() => {
                                setIsExpanded(false);
                                setContent("");
                                setImage(null);
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <textarea
                        className="w-full outline-none text-base resize-none bg-transparent text-gray-900 placeholder:text-gray-500 min-h-25"
                        placeholder="What do you want to talk about?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        autoFocus
                    />

                    {previewUrl && (
                        <div className="relative mt-3">
                            <img
                                src={previewUrl}
                                className="w-full h-60 object-cover rounded-lg"
                                alt="preview"
                            />
                            <button
                                className="absolute top-2 right-2 bg-gray-800/80 text-white hover:bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center backdrop-blur-sm transition-colors"
                                onClick={() => setImage(null)}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                        <div className="flex gap-1">
                            <button
                                className="text-gray-500 hover:bg-gray-100 hover:text-blue-500 p-2 rounded-full transition-colors"
                                onClick={() => fileRef.current?.click()}
                            >
                                <Image size={20} />
                            </button>
                            <button className="text-gray-500 hover:bg-gray-100 hover:text-green-500 p-2 rounded-full transition-colors">
                                <Video size={20} />
                            </button>
                        </div>

                        <button
                            className="px-5 py-1.5 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={!content && !image}
                            onClick={handlePost}
                        >
                            Post
                        </button>
                    </div>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                            if (e.target.files?.[0]) setImage(e.target.files[0]);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
