import HandleClaimStateButton from "./HandleClaimStateButton";
import TonTransection from "./TonTransactionTask";
import InviteFriendsTask from "./InviteFriendsTask";
import { useFindAccountQuery } from "../../../rtk/api/Endpoint";

const TaskList = ({ data, isFetching }) => {

    const getSocialLogo = (category) => {
        switch (category) {
            case 'Twitter':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M17.3646 0H20.7456L13.3592 8.00187L22.0487 18.8906H15.2449L9.91591 12.2867L3.81835 18.8906H0.435394L8.33582 10.3317L0 0H6.97649L11.7934 6.03628L17.3646 0ZM16.178 16.9725H18.0514L5.95853 1.81738H3.94815L16.178 16.9725Z" fill="#D9D9D9" />
                </svg>;
            case 'Telegram':
                return <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                    <path d="M20.394 0.319778L0.856168 8.30384C0.856168 8.30384 -0.0675532 8.63352 0.00394648 9.24157C0.0773712 9.85071 0.831143 10.1293 0.831143 10.1293L5.7473 11.8525C5.7473 11.8525 7.23119 16.9211 7.52324 17.8855C7.81529 18.8473 8.04959 18.87 8.04959 18.87C8.32156 18.9931 8.56878 18.7971 8.56878 18.7971L11.745 15.7814L16.6953 19.7348C18.0342 20.3431 18.5215 19.0757 18.5215 19.0757L22 0.802278C22 -0.414907 20.394 0.319778 20.394 0.319778ZM16.9351 17.6061L11.6391 13.3778L9.99575 14.9376L10.3571 11.619L17.4163 5.05L7.79384 10.6591L3.52558 9.16327L19.8102 2.50817L16.9351 17.6061Z" fill="#D9D9D9" />
                </svg>
            case 'Discord':
                return <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                    <path d="M7.12832 0C6.38314 0 4.13651 0.839539 3.73345 1.00732C3.33039 1.1751 2.88301 1.69885 2.37537 2.56327C1.86704 3.42769 1.45913 4.4382 0.796362 5.92462C0.134287 7.41104 -0.020151 10.2767 0.00201048 11.1513C0.024172 12.0259 0.132902 12.7092 1.10593 13.2266C2.07827 13.7433 2.93841 14.2843 3.84357 14.6096C4.74942 14.935 5.36717 15.1691 5.78685 14.8438C6.20654 14.5184 6.48286 13.9487 6.48286 13.9487C6.48286 13.9487 6.88039 13.4403 6.12966 13.1353C5.37894 12.8298 5.00358 12.616 5.03613 12.3009C5.06938 11.9858 5.12409 11.8129 5.31177 11.8537C5.49945 11.8945 5.94198 12.6263 7.64219 12.9618C9.34239 13.2974 10.9997 13.247 10.9997 13.247C10.9997 13.247 12.6576 13.298 14.3578 12.9618C16.058 12.6263 16.4999 11.8945 16.6875 11.8537C16.8752 11.8129 16.9299 11.9858 16.9632 12.3003C16.9964 12.616 16.6211 12.8298 15.8703 13.1353C15.1196 13.4403 15.5171 13.9487 15.5171 13.9487C15.5171 13.9487 15.7935 14.5178 16.2131 14.8438C16.6321 15.1691 17.2506 14.935 18.1557 14.6096C19.0609 14.2843 19.9217 13.7439 20.8941 13.2266C21.8671 12.7092 21.9758 12.0259 21.998 11.1513C22.0201 10.2773 21.8657 7.41104 21.2029 5.92462C20.5409 4.4382 20.1323 3.42769 19.6239 2.56327C19.117 1.69885 18.6689 1.1751 18.2665 1.00668C17.8635 0.839539 15.6162 0 14.871 0C14.1258 0 13.9056 0.478461 13.9056 0.478461L13.6459 1.00732C13.6459 1.00732 11.9007 0.701742 11.0114 0.701104C10.1222 0.701104 8.35413 1.00732 8.35413 1.00732L8.09442 0.477823C8.09442 0.477823 7.87419 0 7.12832 0ZM7.20935 6.3463H7.23705C8.32365 6.3463 9.20388 7.2222 9.20388 8.30225C9.20388 9.38293 8.32365 10.2582 7.23705 10.2582C6.15044 10.2582 5.27021 9.38293 5.27021 8.30225C5.26952 7.23241 6.13382 6.36097 7.20935 6.3463ZM14.763 6.3463H14.7907C15.8662 6.36097 16.7298 7.23305 16.7298 8.30225C16.7298 9.38293 15.8496 10.2582 14.763 10.2582C13.6757 10.2582 12.7961 9.38293 12.7961 8.30225C12.7961 7.2222 13.6757 6.3463 14.763 6.3463Z" fill="#D9D9D9" />
                </svg>
            case 'CMC':
                return <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                    <path d="M19.1352 13.3557C18.7456 13.5938 18.291 13.6371 17.9447 13.4423C17.5118 13.1825 17.252 12.5981 17.252 11.7972V9.35116C17.252 8.18227 16.7975 7.33806 16.0182 7.1216C14.6978 6.73197 13.702 8.35543 13.3341 8.96153L10.9963 12.7063V8.09568C10.9746 7.03501 10.6283 6.40728 9.9789 6.21246C9.54598 6.08259 8.89659 6.14753 8.26885 7.09996L3.05211 15.4554C2.35944 14.135 1.99145 12.663 1.99145 11.1694C1.99145 6.12588 6.03929 2.03474 10.9963 2.03474C15.9533 2.03474 20.0011 6.12588 20.0011 11.1694V11.1911V11.2127C20.0444 12.1868 19.7413 12.9661 19.1352 13.3557ZM21.9925 11.1694V11.1478V11.1261C21.9709 5.00027 17.0356 0 10.9963 0C4.93533 0 0 5.00027 0 11.1694C0 17.317 4.93533 22.3389 10.9963 22.3389C13.7886 22.3389 16.4295 21.2782 18.4642 19.3517C18.8755 18.9621 18.8971 18.3343 18.5075 17.9231C18.1395 17.5118 17.5118 17.4901 17.1005 17.8581C17.1005 17.8581 17.1005 17.8581 17.0789 17.8798C15.4337 19.4383 13.2258 20.3258 10.953 20.3258C8.2905 20.3258 5.90941 19.1569 4.2643 17.2953L8.96153 9.76244V13.2475C8.96153 14.9142 9.61091 15.4554 10.1521 15.6069C10.6932 15.7584 11.5158 15.6502 12.4033 14.2432L14.9792 10.0655C15.0658 9.93561 15.1307 9.80573 15.2173 9.71914V11.8405C15.2173 13.399 15.845 14.6545 16.9273 15.2606C17.9014 15.8234 19.1352 15.7584 20.1526 15.1307C21.4081 14.3081 22.0791 12.8795 21.9925 11.1694Z" fill="#D9D9D9" />
                </svg>
            case 'Youtube':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M6.71174 0.109502C4.95752 0.108723 3.33366 0.668731 2.1565 1.77053C0.979635 2.87124 0.26944 4.50962 0.269343 6.55172C0.269493 8.6941 1.77667 10.6861 3.81778 12.6414C5.8593 14.5974 8.48553 16.5273 10.8892 18.5308C11.031 18.6442 11.2517 18.6433 11.3929 18.5302C13.7957 16.5282 16.4169 14.5919 18.4639 12.642C20.5127 10.6919 22.0375 8.71702 22.0382 6.55186C22.0384 4.48739 21.3032 2.86614 20.1254 1.77002C18.9477 0.673912 17.3479 0.109692 15.5955 0.108805C13.7927 0.109142 12.2695 1.24615 11.1412 2.39878C10.0174 1.25288 8.51101 0.109381 6.71174 0.109502Z" fill="#D9D9D9" />
                </svg>
            case 'Comment':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M6.71174 0.109502C4.95752 0.108723 3.33366 0.668731 2.1565 1.77053C0.979635 2.87124 0.26944 4.50962 0.269343 6.55172C0.269493 8.6941 1.77667 10.6861 3.81778 12.6414C5.8593 14.5974 8.48553 16.5273 10.8892 18.5308C11.031 18.6442 11.2517 18.6433 11.3929 18.5302C13.7957 16.5282 16.4169 14.5919 18.4639 12.642C20.5127 10.6919 22.0375 8.71702 22.0382 6.55186C22.0384 4.48739 21.3032 2.86614 20.1254 1.77002C18.9477 0.673912 17.3479 0.109692 15.5955 0.108805C13.7927 0.109142 12.2695 1.24615 11.1412 2.39878C10.0174 1.25288 8.51101 0.109381 6.71174 0.109502Z" fill="#D9D9D9" />
                </svg>
            case 'Like':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M6.71174 0.109502C4.95752 0.108723 3.33366 0.668731 2.1565 1.77053C0.979635 2.87124 0.26944 4.50962 0.269343 6.55172C0.269493 8.6941 1.77667 10.6861 3.81778 12.6414C5.8593 14.5974 8.48553 16.5273 10.8892 18.5308C11.031 18.6442 11.2517 18.6433 11.3929 18.5302C13.7957 16.5282 16.4169 14.5919 18.4639 12.642C20.5127 10.6919 22.0375 8.71702 22.0382 6.55186C22.0384 4.48739 21.3032 2.86614 20.1254 1.77002C18.9477 0.673912 17.3479 0.109692 15.5955 0.108805C13.7927 0.109142 12.2695 1.24615 11.1412 2.39878C10.0174 1.25288 8.51101 0.109381 6.71174 0.109502Z" fill="#D9D9D9" />
                </svg>
            case 'Share':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M6.71174 0.109502C4.95752 0.108723 3.33366 0.668731 2.1565 1.77053C0.979635 2.87124 0.26944 4.50962 0.269343 6.55172C0.269493 8.6941 1.77667 10.6861 3.81778 12.6414C5.8593 14.5974 8.48553 16.5273 10.8892 18.5308C11.031 18.6442 11.2517 18.6433 11.3929 18.5302C13.7957 16.5282 16.4169 14.5919 18.4639 12.642C20.5127 10.6919 22.0375 8.71702 22.0382 6.55186C22.0384 4.48739 21.3032 2.86614 20.1254 1.77002C18.9477 0.673912 17.3479 0.109692 15.5955 0.108805C13.7927 0.109142 12.2695 1.24615 11.1412 2.39878C10.0174 1.25288 8.51101 0.109381 6.71174 0.109502Z" fill="#D9D9D9" />
                </svg>
            case 'Linkedin':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M0 2.19436C0 1.5583 0.248303 1.03356 0.744888 0.620146C1.24147 0.206709 1.88706 0 2.6816 0C3.46196 0 4.09333 0.203522 4.57574 0.610605C5.07233 1.0304 5.32063 1.57738 5.32063 2.25161C5.32063 2.86221 5.07943 3.37104 4.59702 3.77812C4.10044 4.19791 3.44777 4.40781 2.63903 4.40781H2.61775C1.83738 4.40781 1.20602 4.19791 0.723606 3.77812C0.241195 3.35833 0 2.8304 0 2.19436ZM0.276673 18.8906V6.14421H5.00139V18.8906H0.276673ZM7.61914 18.8906H12.3439V11.7732C12.3439 11.328 12.4006 10.9845 12.5141 10.7428C12.7127 10.3103 13.0143 9.94458 13.4186 9.64565C13.823 9.3467 14.3302 9.19724 14.9403 9.19724C16.5294 9.19724 17.324 10.1577 17.324 12.0785V18.8906H22.0487V11.5824C22.0487 9.69971 21.5521 8.27179 20.5589 7.29864C19.5657 6.32549 18.2533 5.83891 16.6216 5.83891C14.7913 5.83891 13.3654 6.54492 12.3439 7.95695V7.99511H12.3226L12.3439 7.95695V6.14421H7.61914C7.64751 6.55128 7.66171 7.817 7.66171 9.94141C7.66171 12.0658 7.64751 15.0489 7.61914 18.8906Z" fill="#D9D9D9" />
                </svg>
            case 'Partnership':
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M6.71174 0.109502C4.95752 0.108723 3.33366 0.668731 2.1565 1.77053C0.979635 2.87124 0.26944 4.50962 0.269343 6.55172C0.269493 8.6941 1.77667 10.6861 3.81778 12.6414C5.8593 14.5974 8.48553 16.5273 10.8892 18.5308C11.031 18.6442 11.2517 18.6433 11.3929 18.5302C13.7957 16.5282 16.4169 14.5919 18.4639 12.642C20.5127 10.6919 22.0375 8.71702 22.0382 6.55186C22.0384 4.48739 21.3032 2.86614 20.1254 1.77002C18.9477 0.673912 17.3479 0.109692 15.5955 0.108805C13.7927 0.109142 12.2695 1.24615 11.1412 2.39878C10.0174 1.25288 8.51101 0.109381 6.71174 0.109502Z" fill="#D9D9D9" />
                </svg>
            case 'Visit':
                return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
            default:
                return <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                    <path d="M6.71174 0.109502C4.95752 0.108723 3.33366 0.668731 2.1565 1.77053C0.979635 2.87124 0.26944 4.50962 0.269343 6.55172C0.269493 8.6941 1.77667 10.6861 3.81778 12.6414C5.8593 14.5974 8.48553 16.5273 10.8892 18.5308C11.031 18.6442 11.2517 18.6433 11.3929 18.5302C13.7957 16.5282 16.4169 14.5919 18.4639 12.642C20.5127 10.6919 22.0375 8.71702 22.0382 6.55186C22.0384 4.48739 21.3032 2.86614 20.1254 1.77002C18.9477 0.673912 17.3479 0.109692 15.5955 0.108805C13.7927 0.109142 12.2695 1.24615 11.1412 2.39878C10.0174 1.25288 8.51101 0.109381 6.71174 0.109502Z" fill="#D9D9D9" />
                </svg>
        }
    };
    const userId = localStorage.getItem("id");
    const { data: AccountData, } = useFindAccountQuery(userId);

    return (
        <div>
            <div className="flex flex-col gap-5 mt-5">
                {
                    isFetching ? <div className="">
                        <div className="w-full h-16 skeleton rounded-2xl"></div>
                        <div className="w-full h-16 skeleton rounded-2xl my-3"></div>
                        <div className="w-full h-16 skeleton rounded-2xl"></div>
                        <div className="w-full h-16 skeleton rounded-2xl my-3"></div>
                        <div className="w-full h-16 skeleton rounded-2xl"></div>
                        <div className="w-full h-16 skeleton rounded-2xl my-3"></div>
                        <div className="w-full h-16 skeleton rounded-2xl"></div>

                    </div> :
                        <>
                            <p className="uppercase font-medium text-xl text-white">Important for airdrop</p>
                            <div>
                                <TonTransection complete={AccountData?.transaction} />
                            </div>
                            <div>
                                <InviteFriendsTask refer_count={3} rewards={5000} complete={AccountData?.friend} />
                            </div>

                            <p className="uppercase font-medium text-xl text-white">Task</p>
                            {
                                data?.map((item, index) =>
                                    <div className="relative" key={index}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                {/* <img src= alt="social logo" className="size-6" /> */}
                                                {getSocialLogo(item?.category)}
                                                <div className="">
                                                    <p className="font-montserrat text-white text-sm capitalize">{item?.title}</p>
                                                    <p className="font-montserrat text-[#D9D9D9] text-sm">+{item?.points} SP</p>
                                                </div>
                                            </div>
                                            {
                                                item?.isComplete ?
                                                    <button className="bg-[#27c9ff] px-3 py-1 w-16 h-8 rounded-full font-montserrat text-black font-bold flex justify-center items-center">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.5 1.25C4.05 1.25 1.25 4.05 1.25 7.5C1.25 10.95 4.05 13.75 7.5 13.75C10.95 13.75 13.75 10.95 13.75 7.5C13.75 4.05 10.95 1.25 7.5 1.25ZM7.5 12.5C4.74375 12.5 2.5 10.2563 2.5 7.5C2.5 4.74375 4.74375 2.5 7.5 2.5C10.2563 2.5 12.5 4.74375 12.5 7.5C12.5 10.2563 10.2563 12.5 7.5 12.5ZM9.925 5.18125L6.25 8.85625L5.075 7.68125C4.83125 7.4375 4.4375 7.4375 4.19375 7.68125C3.95 7.925 3.95 8.31875 4.19375 8.5625L5.8125 10.1813C6.05625 10.425 6.45 10.425 6.69375 10.1813L10.8125 6.0625C11.0562 5.81875 11.0562 5.425 10.8125 5.18125C10.5687 4.9375 10.1687 4.9375 9.925 5.18125Z" fill="black" />
                                                        </svg>
                                                    </button> :
                                                    <HandleClaimStateButton taskId={item?._id} link={item?.link} />
                                            }
                                        </div>

                                        <div className="w-[87%] h-[1px] bg-[#99999966] absolute -bottom-2 right-0"></div>
                                    </div>
                                )}


                            {/* <div className="relative">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <img src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" alt="social logo" className="size-6" />

                                        <div className="">
                                            <p className="font-roboto text-white text-sm">Follow SFT Protocol on X</p>
                                            <p className="font-roboto text-[#D9D9D9] text-sm">+10 SP</p>
                                        </div>
                                    </div>

                                    <button className="bg-[#282828] px-3 py-1 rounded-full font-roboto text-white font-bold">Start</button>
                                </div>

                                <div className="w-[87%] h-[1px] bg-[#99999966] absolute -bottom-2 right-0"></div>
                            </div>

                            <div className="relative">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <img src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" alt="social logo" className="size-6" />

                                        <div className="">
                                            <p className="font-roboto text-white text-sm">Follow SFT Protocol on X</p>
                                            <p className="font-roboto text-[#D9D9D9] text-sm">+10 SP</p>
                                        </div>
                                    </div>

                                    <button className="bg-yellow-500 px-3 py-1 rounded-full font-roboto text-black font-bold">Claim</button>
                                </div>

                                <div className="w-[87%] h-[1px] bg-[#99999966] absolute -bottom-2 right-0"></div>
                            </div> */}
                        </>
                }
            </div>
        </div>
    );
};

export default TaskList;